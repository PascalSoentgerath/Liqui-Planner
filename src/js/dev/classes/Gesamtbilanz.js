/**
 * Das Modul "Gesamtbilanz" stellt die Klasse "Gesamtbilanz" zur Verfügung
 * @module classes/Gesamtbilanz
 */

/**
 * Die Klasse "Gesamtbilanz" stellt alle Eigenschaften
 * und Methoden der Gesamtbilanz (inkl. HTML) zur Verfügung.
 */
export default class Gesamtbilanz {
    
  /** 
   * Der Konstruktor setzt bei Instanziierung der Klasse "Gesamtbilanz" alle 
   * u.g. Eigenschaften der Gesamtbilanz und generiert deren HTML.
   * @prop {Number} _einnahmen - die Summe aller Einnahmen (in Cent, ganzzahlig)
   * @prop {Number} _ausgaben - die Summe aller Ausgaben (in Cent, ganzzahlig)
   * @prop {Number} _bilanz - die Differenz aus Einnahmen und Ausgaben (in Cent, ganzzahlig)
   * @prop {Element} _html - das HTML der Gesamtbilanz
   */
    constructor() {
        this._einnahmen = 0
        this._ausgaben = 0
        this._bilanz = 0
        this._html = this._html_generieren()
    }

    /**
     * Diese Methode aktualisiert die Gesamtbilanz des Haushaltsbuch beim Hinzufügen oder Entfernen 
     * eines Eintrags anhand der Einträge des Haushaltsbuchs, generiert das HTML der Gesamtbilanz
     * und zeigt die neu generierte Gesamtbilanz an
     * @param {Arrays} eintraege - Arrays mit allen Einträgen des Haushaltsbuchs
     */
    aktualisieren(eintraege) {
      this._einnahmen = 0
      this._ausgaben = 0
      this._bilanz = 0
      eintraege.forEach(eintrag => {
        switch (eintrag.typ()) {
          case "einnahme": 
              this._einnahmen = this._einnahmen + eintrag.betrag() 
              this._bilanz = this._bilanz + eintrag.betrag()
          break;
          case "ausgabe":
            this._ausgaben = this._ausgaben + eintrag.betrag()
            this._bilanz = this._bilanz - eintrag.betrag() 
            break;
          default:
              alert("Falsche Eingabe")
            break;
        }
      })    
        this._html = this._html_generieren()
        this.anzeigen()
    }

    /**
     * Diese private Methode generiert das HTML der Gesamtbilanz.
     * @return {Element} - das Gesamtbilanz-Element mit all seinen Kindelementen 
     */
    _html_generieren() {

        let gesamtbilanz = document.createElement("aside")
        gesamtbilanz.setAttribute("id", "gesamtbilanz")

        let header = document.createElement("h1")
        header.textContent = "Gesamtbilanz"
        gesamtbilanz.insertAdjacentElement("afterbegin", header)

        let gesamtbilanz_einnahmen = document.createElement("div")
        gesamtbilanz_einnahmen.setAttribute("class", "gesamtbilanz-zeile einnahmen")
        let einnahmen_span_typ = document.createElement("span")
        einnahmen_span_typ.textContent = "Einnahmen:"
        let einnahmen_span_betrag = document.createElement("span")
        einnahmen_span_betrag.textContent = `${(this._einnahmen / 100).toFixed(2)}€`
        gesamtbilanz_einnahmen.insertAdjacentElement("afterbegin", einnahmen_span_typ)
        gesamtbilanz_einnahmen.insertAdjacentElement("beforeend", einnahmen_span_betrag)
        gesamtbilanz.insertAdjacentElement("beforeend", gesamtbilanz_einnahmen)
        
        let gesamtbilanz_ausgaben = document.createElement("div")
        gesamtbilanz_ausgaben.setAttribute("class", "gesamtbilanz-zeile ausgaben")
        let ausgaben_span_typ = document.createElement("span")
        ausgaben_span_typ.textContent = "Ausgaben:"
        let ausgaben_span_betrag = document.createElement("span")
        ausgaben_span_betrag.textContent = `${(this._ausgaben / 100).toFixed(2)}€`
        gesamtbilanz_ausgaben.insertAdjacentElement("afterbegin", ausgaben_span_typ)
        gesamtbilanz_ausgaben.insertAdjacentElement("beforeend", ausgaben_span_betrag)
        gesamtbilanz.insertAdjacentElement("beforeend", gesamtbilanz_ausgaben)

        let gesamtbilanz_bilanz = document.createElement("div")
        gesamtbilanz_bilanz.setAttribute("class", "gesamtbilanz-zeile bilanz")
        let bilanz_span_typ = document.createElement("span")
        bilanz_span_typ.textContent = "Bilanz:"
        let bilanz_span_betrag = document.createElement("span")
   
        this._bilanz >= 0 ? bilanz_span_betrag.setAttribute("class", "positiv") : bilanz_span_betrag.setAttribute("class", "negativ")

        bilanz_span_betrag.textContent = `${(this._bilanz / 100).toFixed(2)}€`
        gesamtbilanz_bilanz.insertAdjacentElement("afterbegin", bilanz_span_typ)
        gesamtbilanz_bilanz.insertAdjacentElement("beforeend", bilanz_span_betrag)
        gesamtbilanz.insertAdjacentElement("beforeend", gesamtbilanz_bilanz)
    
        return gesamtbilanz
    } 
    
    /**
     * Diese private Methode entfernt eine bereits bestehende Gesamtbilanz, wenn vorhanden.
     */
    _entfernen() {
      let gesamtbilanz =  document.querySelector("#gesamtbilanz")
      if (gesamtbilanz !== null) {
        gesamtbilanz.remove()
    }
    }
    
    /**
     * Diese Methode zeigt die generierte Gesamtbilanz an der richtigen Stelle in der UI an.
     */
    anzeigen() {
          this._entfernen()
          document.querySelector("body").insertAdjacentElement("beforeend", this._html)
        }
    }
