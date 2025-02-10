import InputText from "../components/InputText";
import InputTable from "../components/InputTable";
import InputTextarea from "../components/InputTextarea";
import InputRadio from "../components/InputRadio";
import InputDate from "../components/InputDate";

class FormBuilder {
  // pass in response object
  constructor() {
    this.form = [];
    this.formElem = {};
  }

  // initialize each component
  /** standard input type text|date|textarea|table|radio*/
  input(input) {
    this.formElem = { ...this.formElem, input: input };
    return this;
  }

  /** label for input */
  label(label) {
    this.formElem = { ...this.formElem, label: label };
    return this;
  }

  model(model) {
    this.formElem = { ...this.formElem, model: model };
    return this;
  }

  /** the type of the response attribute string|array|objects */
  type(type) {
    this.formElem = { ...this.formElem, type: type };
    return this;
  }

  /** reponse model attribute that this input corresponds too */
  bind(bind) {
    this.formElem = { ...this.formElem, bind: bind };
    return this;
  }

  /** input placeholder value */
  placeholder(placeholder) {
    this.formElem = { ...this.formElem, placeholder: placeholder };
    return this;
  }

  /** set table or radio headers */
  options(options) {
    this.formElem = { ...this.formElem, options: options };
    return this;
  }

  /** set table or radio headers */
  headers(headers) {
    this.formElem = { ...this.formElem, headers: headers };
    return this;
  }

  /** if you want two components to be in the same line */
  inline() {
    this.formElem = { ...this.formElem, inline: true };
    return this;
  }

  // add this to form
  add() {
    this.form.push(this.formElem);
    this.formElem = "";
  }

  compile(f) {
    switch (f.input) {
      // switch statement for input values different styling and input types
      case "text":
        // returns the html element of assinged styling
        return (
          <InputText
            name={f.bind}
            valueType={f.value}
            label={f.label}
            placeholder={f.placeholder}
            type={f.type}
          />
        );
      // date format (more details read above)
      case "date":
        return (
          <InputDate
            name={f.bind}
            label={f.label}
            placeholder={f.placeholder}
            type={f.type}
          />
        );
      // textarea format (more details read above)
      case "textarea":
        return (
          <InputTextarea
            name={f.bind}
            label={f.label}
            placeholder={f.placeholder}
            type={f.type}
          />
        );

      case "dropdown":
        return (
          <InputTextarea
            name={f.bind}
            label={f.label}
            placeholder={f.placeholder}
            type={f.type}
          />
        );

      case "radio":
        return (
          <InputRadio
            name={f.bind}
            label={f.label}
            headers={f.headers}
            type={f.type}
          />
        );
      case "table":
        return (
          <InputTable
            name={f.bind}
            model={f.model}
            headers={f.headers}
            type={f.type}
          />
        );
      default:
        return;
    }
  }

  /** build the form that will be used in the jsx component */
  build() {
    let rendered = [];
    let content = [];
    for (let [i, f] of this.form.entries()) {
      if (rendered.at(i)) {
        continue;
      }
      rendered.push(i);

      if (this.form[i].inline != undefined) {
        var next = this.form[i + 1];
        rendered.push(i + 1);
        content.push(
          <div className="flex gap-4 w-full">
            {this.compile(f)}
            {this.compile(next)}
          </div>
        );
      } else {
        content.push(this.compile(f));
      }
    }
    return content;
  }
}

export default FormBuilder;
