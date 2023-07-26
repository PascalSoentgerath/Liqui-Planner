/**
 * Das Module "Fehlerbox" stellt die Klasse "Fehlerbox" zur Verfügung.
 * @module classes/Fehlerbox
 */

/**
 * Die Klasse "Fehlerbox" stellt alle Eigenschaften
 * und Methoden der Fehlerbox im Eingabeformular (inkl. HTML) zur Verfügung
 */
export default class Fehlerbox {
    
    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Fehler"
     * das HTML einer Fehlerbox anhand der u.g. Parameter und Eigenschaften.
     * @param {*} fehlertext - Einleitungstext der Fehlerbox
     * @param {*} formular_fehler - Array mit den Namen ("Titel", "Typ", "Betrag" oder "Datum")
     * der fehlerhaft ausgefüllten Eingabefelder
     * @prop {String} _fehlertext - Einleitungstext der Fehlerbox
     * @prop {Array} _formular_fehler - Array mit den Namen ("Titel", "Typ", "Betrag" oder "Datum")
     * der fehlerhaft ausgefüllten Eingabefelder
     * @prop {Element} _html - das HTML der Fehlerbox
     */
    constructor(fehlertext, formular_fehler) {
        this._fehlertext = fehlertext
        this._formular_fehler = formular_fehler
        this._html = this._html_generieren()
    }

    /**
     * Diese private Methode generiert das HTML einer Fehlerbox für das Eingabeformular.
     * @returns {Element} - das Fehlerbox-Element mit all seinen Kindelementen
     */
    _html_generieren() {
        
            let fehlerbox = document.createElement("div")
            fehlerbox.setAttribute("class", "fehlerbox")

            let span = document.createElement("span")
            span.textContent = this._fehlertext
           
            let liste = document.createElement("ul")
            liste.setAttribute("class", "liste_eingabefehler")
            
            fehlerbox.insertAdjacentElement("afterbegin", span)
            fehlerbox.insertAdjacentElement("beforeend", liste)
           
            this._fehlerliste.forEach(e => {
                liste.insertAdjacentHTML("beforeend", `
                    <li>${e}</li>
                `)})
            return fehlerbox
    }

    /**
     * Diese private Methode entfernt bei Instanziierung einer neuen Fehlerbox eine eventuell 
     * bereits bestehende Fehlerbox, damit immer nur eine Fehlerbox angezeigt wird. Genutz wird 
     * diese Methode in this.anzeigen().
     */
    _entfernen() {
        if (document.querySelector(".fehlerbox") !== null) {
            document.querySelector(".fehlerbox").remove()
        }
    }

    /**
     * Diese Methode zeigt die generierte Fehlerbox an der richtigen STelle im Eingabeformular an und entfernt
     * mit Hilfe von this._entfernen() eine eventuell bereits bestehende Fehlerbox.
     */
    anzeigen() {
        this._entfernen()
        let eingabeformular_container = document.querySelector("#eingabeformular-container")
        if (eingabeformular_container !== null) {
            eingabeformular_container.insertAdjacentElement("afterbegin", this._html)
        }
    }
}