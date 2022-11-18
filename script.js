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
    #TimeFormat = new Intl.RelativeTimeFormat('pl');
    get wiekProduktuLata(){
        return this.#TimeFormat.format(this.wiekProduktu, 'year').slice(3);
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
        if(!(idProduktu in this.#produkty)){
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
        if(this.#iloscProduktow[produkt.id] = 0){
            this.#iloscProduktow[produkt.id] = ilosc;
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
            return this.#iloscProduktow[arguments[0]];
        else if (this.#iloscProduktow[arguments[0]] < arguments[1]) {
            throw new Error(`Produkt o id: ${arguments[0]} nie jest dostępny w magazynie w podanej ilości: ${arguments[1]}`);
        }
    }

    wypiszProdukt(idProduktu) {
        console.log(`Id: ${idProduktu} = ${this.#iloscProduktow[idProduktu]}`);
    }

    wypiszWszystkieProdukty() {
        console.log('Ilość każdego produktu w magazynie: ');
        for (const idProduktu in this.#iloscProduktow) {
            this.wypiszProdukt(idProduktu);
        }
    }

}

class Sklep extends ListaTowarow{
    dodajProdukt(...args){
        if (args.length === 4) {
            const [nazwa, model, cena, energia] = args
            const produkt = new Produkt(new Date().valueOf(), nazwa, model, new Date(), cena, energia)
            return super.dodajProdukt(produkt)
        }
        else if (args.length === 5) {
            const [id, nazwa, model, cena, energia] = args
            const produkt = new Produkt(id, nazwa, model, new Date(), cena, energia)
            return super.dodajProdukt(produkt)
        }
        throw new Error('Popraw ilosc argumentow!!!');
    }
    wypiszProdukty() {
        console.log('Wszysktie produkty w sklepie:')
        return super.wypiszWszystkieProdukty();
    }
}

class Zamowienie {
    #sklep = null
    #magazyn = null
    #iloscProduktow = {}
    constructor(sklep, magazyn) {
        this.#sklep = sklep;
        this.#magazyn = magazyn;
    }

    dodajProdukt(...arg) {
        var id;
        var ilosc;
        if (arguments.length === 1) {
            id = arguments[0];
            ilosc = 1;
            console.log(id);

        }

         if (arguments.length > 1) {
             id = arguments[0];
             ilosc = arguments[1];
             console.log(id);
             console.log(ilosc);

         }

        // this.#sklep.getProdukt(id);
        //     this.#magazyn.getProdukt(id);
        //     this.#iloscProduktow[id] ??= 0;
        //     var temp = this.#iloscProduktow[id] + ilosc;
        //     this.#magazyn.sprawdzIlosc(id, temp);
        //     if (this.#iloscProduktow[id] != 0) {
        //         console.log(`Zmieniono ilość produktu o id: ${id}, z ${this.#iloscProduktow[id]} na ${temp} w zamówieniu`);
        //     }
        //     else console.log(`Dodano produkt o id: ${id} i ilości ${ilosc} do zamówienia`);
        //     this.#iloscProduktow[id] = temp;

        try {
            this.#sklep.getProdukt(id);
            this.#magazyn.getProdukt(id);
            this.#iloscProduktow[id] ??= 0;
            var temp = this.#iloscProduktow[id] + ilosc;
            this.#magazyn.sprawdzIlosc(id, temp);
            if (this.#iloscProduktow[id] != 0) {
                console.log(`Zmieniono ilość produktu o id: ${id}, z ${this.#iloscProduktow[id]} na ${temp} w zamówieniu`);
            }
            else console.log(`Dodano produkt o id: ${id} i ilości ${ilosc} do zamówienia`);
            this.#iloscProduktow[id] = temp;
        } 
        catch (e) {
            console.log(e.message);
        }
    }
    zlozZamowienie() {
        console.log(`\nZłożono zamówienie dla:`);
        for (const [id, ilosc] of Object.entries(this.#iloscProduktow)) {
            console.log(`Produktu o id: ${id} w ilości ${ilosc}`);
            for (var i = 0; i < ilosc; i++) {
                this.#magazyn.zabierzProdukt(id);
            }
        }
    }
}


var produkt1 = new Produkt(0, "Samsung", "S10", (new Date()), 2300, 110);
var produkt2 = new Produkt(1, "Lenovo", "Legion", (new Date()), 9999, 300);
var produkt3 = new Produkt(2, "Monster", "Czarny", (new Date()), 5, 1);
var produkt4 = new Produkt(3, "HK416", "GROM", '2019-01-21', 3500, 40);

lista = [];
lista.push(produkt1);
lista.push(produkt2);
lista.push(produkt3);
lista.push(produkt4);

console.log("Sklep kermita: \n");
for(var i = 0; i < lista.length; i++){
    console.log("Nazwa: " + lista[i].nazwa + " |Model: "+ lista[i].model + " |Koszt: "+ lista[i].koszt + " |Koszt Energii: "+ lista[i].kosztEnergii + " |Wiek produktu: "+lista[i].wiekProduktuLata);
}   

var shop = new Sklep();
var magazine = new Magazyn();
var order = new Zamowienie(shop, magazine);


for(var i = 0; i < lista.length; i++){
    magazine.dodajProdukt(lista[i], 5);
}  
console.log("Magazine: \n"); 
magazine.wypiszWszystkieProdukty();

console.log("Sklep kermita v2: \n");

for(var i = 0; i < lista.length; i++){
    shop.dodajProdukt(lista[i].id, lista[i].nazwa, lista[i].model, lista[i].koszt, lista[i].kosztEnergii);
} 

shop.dodajProdukt('produktBezId', 'modelBezId', 99, 9);
shop.wypiszProdukty();

console.log("Zamowienia: \n");
//console.log(" \npierwsze:");
order.dodajProdukt(1,4);
//console.log(" \ndrugie:");
order.dodajProdukt(2,4);
order.dodajProdukt(3,4);
order.dodajProdukt(0,3);
order.dodajProdukt(1);
order.dodajProdukt(2,1);
order.dodajProdukt(3);
order.dodajProdukt(0,2);
order.zlozZamowienie();