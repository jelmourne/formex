// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::{sync::Mutex, vec};
use tauri::{Manager, State, Window};

mod model;
use model::{Menu, User};

// events
#[derive(Serialize)]
struct AppState {
    is_menu_open: bool,
    menu: Vec<Menu>,
    user: User
}

impl Default for AppState {
    fn default() -> Self {
        AppState {
            is_menu_open: true,
            menu: Vec::from([
                Menu {
                    path: "/calibration_certificate".to_string(),
                    icon: "tool_cert.png".to_string(),
                    title: "calibration certificate".to_string(),
                },
                Menu {
                    path: "/tooling_equivalence".to_string(),
                    icon: "tool_equiv.png".to_string(),
                    title: "tooling equivalance".to_string(),
                },
            ]),
            user: User {name: "".to_string()}
        }
    }
}

#[tauri::command]
fn toggle_menu(state: State<'_, Mutex<AppState>>) -> bool {
    let mut state = state.lock().unwrap();
    state.is_menu_open = !state.is_menu_open;
    return state.is_menu_open;
}

#[tauri::command]
fn get_menu_open(state: State<'_, Mutex<AppState>>) -> bool {
    let state = state.lock().unwrap();
    return state.is_menu_open;
}

#[tauri::command]
fn get_menu(state: State<'_, Mutex<AppState>>) -> Vec<Menu> {
    let state = state.lock().unwrap();
    return state.menu.clone();
}

#[tauri::command]
fn close_splashscreen(window: Window) {
    window.get_webview_window("splashscreen")
        .expect("no splashscreen found")
        .close()
        .unwrap();

    window.get_webview_window("main")
        .expect("no mainscreen found")
        .show()
        .unwrap();
}

#[tauri::command]
fn set_user(state: State<'_, Mutex<AppState>>, name: String) -> User {
    let mut state = state.lock().unwrap();
    state.user.name = name;
    return state.user.clone();
}

#[tauri::command]
fn get_user(state: State<'_, Mutex<AppState>>) -> User {
    let state = state.lock().unwrap();
    return state.user.clone();
}

// main run process
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::default()));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            toggle_menu,
            close_splashscreen,
            get_menu_open,
            get_menu,
            set_user,
            get_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
