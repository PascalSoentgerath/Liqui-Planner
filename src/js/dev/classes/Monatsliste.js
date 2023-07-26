/**
 * Das Modul "Monatsliste" stellt die Klasse "Monatsliste" zur Verfügung
 * @module classes/Monatsliste 
*/

/**
 * Die Klasse "Monatsliste" stellt alle Eigenschaften
 * und Methoden eines Eintrags (inkl. HTML) zur Verfügung.
 */
export default class Monatsliste {
   
    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Monatsliste"
     * anhand der u.g. Parameter ein Monatsliste-Objekt mit den u.g. Eigenschaften. 
     * @param {Number} jahr - das Jahr zu dem die Monatsliste gehört (z.B. 2023)
     * @param {Number} monat - der Monat zu dem die Monatsliste gehört (als Zahl, z.b. 1 -> Januar, 2 -> Februar)
     * @prop {Number} _jahr - das Jahr zu dem die Monatslite gehört (z.B. 2023)
     * @prop {Number} _monat - der Monat zu dem die Monatsliste gehört (als Zahl, z.b. 1 -> Januar, 2 -> Februar)
     * @prop {Array} _eintraege - ein Array mit den Eintrags-Objekten der Monatsliste
     * @prop {Number} _bilanz - die Bilanz des Monats
     * @prop {Element} _html - das HTML der Monatsliste
    */
    constructor(jahr, monat) {
        this._jahr = jahr
        this._monat = monat
        this._eintraege = []
        this._bilanz = 0
        this._html = this._html_generieren()
    }

    /**
     * Getter-Methode für den Monat des Monatsliste.
     * @return {Number} - der Monat zu dem die Monatsliste gehört (als Zahl, also z.B. 1 -> Januar, 2 -> Februar)
     */
    monat() {
        return this._monat
    }

    /**
     * Getter-Methode für das Jahr des Monatsliste.
     * @return {Number} - das Jahr zu dem die Monatsliste gehört (z.B. 2020)
     */
    jahr() {
        return this._jahr
    }

    /**
     * Getter-Methode für das HTML der Monatsliste.
     * @return {Element} - das HTML der Monatsliste
     */
    html() {
        return this._html
    }

    /**
     * Diese Methode fügt ein ihr übergebenes Eintrags-Objekt zur Sammlung der Einträge (this._eintraege)
     * der Monatsliste hinzu und aktualisiert anschließend die Eigenschaften der Monatsliste mit Hilfe der
     * Methode this._aktualisieren().
     * @param {Object} eintrag - ein Eintrags-Objekt 
     */
    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag)
        this._html_aktualisieren()
    }

    /**
     * Diese private Methode sortiert die Sammlung der Einträge der Monatsliste absteigend nach Datum
     * des Eintrags. Einträge mit gleichem Datum werden absteigend nach Erstellungs-Timestamp des 
     * Eintrags sortiert.
     */
    _eintraege_sortieren() {
        this._eintraege.sort((a, b) => {
            if (a.datum() > b.datum()) {
                return -1
            }
            else if (a.datum() < b.datum()) {
                return 1
            }
            else {
                if (a.timestamp() > b.timestamp()) {
                    return -1
                }
                else {
                    return 1
                }
            }
        })
      }
    
    /**
     * Diese private Methode bilanziert die Monatsliste anhand der in this._eintraege
     * enthaltenen Einträge und aktualisiert damit die Monatsbilanz.
     */
    _bilanzieren() {
        let monatsbilanz = 0
        this._eintraege.forEach(eintrag => {
            if (eintrag.typ() === "einnahme") {
                monatsbilanz += eintrag.betrag()
            }
            else {
                monatsbilanz -= eintrag.betrag()
            }
        })

        this._bilanz = monatsbilanz
    }

    /**
     * Diese private Methode generiert das HTML der Monatsliste.
     * @returns {Element} - das Monatsliste-Element mit all seinen Kindelementen
     */
    _html_generieren() {    
        let neue_monatsliste = document.createElement("article")
        neue_monatsliste.setAttribute("class", "monatsliste")

        let header = document.createElement("h2")
        neue_monatsliste.insertAdjacentElement("afterbegin", header)

        let monat_jahr = document.createElement("span")
        monat_jahr.setAttribute("class", "monat-jahr")
        monat_jahr.textContent = `${new Date(this._jahr, this._monat - 1).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long"
        })}`
        header.insertAdjacentElement("afterbegin", monat_jahr)

        let monatsbilanz = document.createElement("span")
        this._bilanz >= 0 ? monatsbilanz.setAttribute("class", "monatsbilanz positiv") : monatsbilanz.setAttribute("class", "monatsbilanz negativ")
        monatsbilanz.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`
        header.insertAdjacentElement("beforeend", monatsbilanz)

        let eintragsliste = document.createElement("ul")
        this._eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", eintrag.html()))
        neue_monatsliste.insertAdjacentElement("beforeend", eintragsliste)

        return neue_monatsliste
        
    }

    /**
     * Diese private Methode aktualisiert den Zustand der Monatsliste indem sie
     * die Einträge der Monatsliste in this._eintraege erneut sortiert, die Monatsliste
     * erneut bilanziert und anschließend das HTML der Monatsliste erneut generiert.
     */
    _html_aktualisieren() {
        this._eintraege_sortieren()
        this._bilanzieren()
        this._html = this._html_generieren()
    }
} 