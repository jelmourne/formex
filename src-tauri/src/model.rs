use serde::Serialize;

#[derive(Serialize)]
pub struct Menu {
    pub path: String,
    pub icon: String,
    pub title: String,
}

impl Clone for Menu {
    fn clone(&self) -> Menu {
        Menu {
            path: self.path.to_string(),
            icon: self.icon.to_string(),
            title: self.title.to_string(),
        }
    }
}

#[derive(Serialize)]
pub struct User {
    pub name: String
}

impl  Clone for User {
    fn clone(&self) -> User {
        User { name: self.name.to_string() }
    }
}

