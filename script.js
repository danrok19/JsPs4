var GlobalPrice = 120;

class Produkt{

    constructor(id, nazwa, model, rok_produkcji, cena, zuzycieEnergii) {
      this.id = id;
      this.nazwa = nazwa;
      this.model = model;
      this.rok_produkcji = new Date(rok_produkcji);
      this.cena = cena;
      this.zuzycieEnergii = zuzycieEnergii;
    }

    get koszt(){
        return this.cena;
    }
    get kosztEnergii(){
        return this.zuzycieEnergii*GlobalPrice;
    }
    get wiekProduktu(){
        return new Date().getFullYear() - this.rok_produkcji.getFullYear();
    }
    get wiekProduktuLata(){
        return this.#intl.format(this.wiekProduktu(), 'year').slice(3);
    }

  }

  function koszt() {
    console.log(this.nazwa + " " + this.cena);
}

class ListaTowarow{
    #produkty = {}
    wypiszProdukt(idProduktu){
        console.log(this.#produkty[idProduktu]);
    }

    wypiszWszystkieProdukty(){
        for(const idProduktu in this.#produkty){
            this.wypiszProdukt(idProduktu);
        }
    }

    dodajProdukt(produkt){
        if(produkt.id in this.#produkty){
            throw new Error(`Wyjątek: Produkt o id: ${produkt.id} jest już na liście`);
        }
        else{
            this.#produkty[produkt.id] = produkt;
        }
    }

    zmienProdukt(idProduktu, produkt){
        if(!(idProduktu in this.#produkty)){
            throw new Error(`Produkt o id: ${idProduktu} nie ma na liście`);
        }
        
        for(const [key, value] of Object.enteries(produkt)){
            this.#produkty[idProduktu][key] = value;
        }
    }

    getProdukt(idProduktu){
        if(!(id in this.#produkty)){
            throw new Error(`Produkt o id: ${idProduktu} nie ma na liście`);
        }
        else {
            return this.#produkty[idProduktu]
        }
    }

    getIdProduktu(nazwa, model) {
        var idProduktu = -1;
        for (const idProduktu in this.#produkty) {
            if (this.#produkty[idProduktu].nazwa === nazwa && this.#produkty[idProduktu].model === model)
                idProduktu = this.#produkty[idProduktu].id;
        }
        return idProduktu;
    }
}

class Magazyn extends ListaTowarow{
    #iloscProduktow = {};
    dodajProdukt(produkt, ilosc = 1){
        try{
            super.dodajProdukt(produkt);
        }
        catch(exeption){}
        if(this.#iloscProdoktow[produkt.id] = 0){
            this.#iloscProdoktow[produkt.id] = ilosc;
        }
        this.#iloscProduktow[produkt.id] += ilosc;
    }

    zabierzProdukt(){
        if(arguments.length === 1){
            var idProduktu = arguments[0];
        }
        else if(arguments.length > 1){
            var idProduktu = super.getIdProduktu(arguments[0], arguments[1]);
        }

        const produkt = this.getProdukt(idProduktu);

        if(this.#iloscProduktow[idProduktu] === 0){
            throw new Error(`Produkt o id: ${idProduktu} nie ma na liście`);
        }
        else{
            this.#iloscProduktow[idProduktu] -= 1;
        }
        return produkt;
    }

    sprawdzIlosc(){
        if (arguments.length === 1)
            return this.#iloscProdoktow[arguments[0]];
        else if (this.#iloscProdoktow[arguments[0]] < arguments[1]) {
            throw new Error(`Produkt o id: ${arguments[0]} nie jest dostępny w magazynie w podanej ilości: ${arguments[1]}`);
        }
    }

    wypiszProdukt(idProduktu) {
        console.log(`Id: ${idProduktu} = ${this.#iloscProdoktow[idProduktu]}`);
    }

    wypiszWszystkieProdukty() {
        console.log('Ilość każdego produktu w magazynie: ');
        for (const idProduktu in this.#iloscProdoktow) {
            this.wypiszProdukt(idProduktu);
        }
    }

}

