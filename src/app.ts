// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA: number = 10;
let pokoj: number = 1;
let energia: number = MAKS_ENERGIA;
let karta: boolean = false;
let bezpiecznik: boolean = false;
let zasilanie:boolean = false;
let koniec:boolean = false;
let wygrana:boolean = false;
let iloscRuchow: number = 0;

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  iloscRuchow = 0;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer: number): string {
  // TODO A1: switch; zwroc nazwe pokoju jako tekst.
  switch (numer) {
    case 1:
      return "Recepcja";
    case 2:
      return "Magazyn";
    case 3: 
      return "Serwerownia";
    case 4:
      return "Wyjście";
    default:
      return "Nieznane pomieszczenie";
  }
}
function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), akcja("karta")');
  // TODO A5: dopisz pozostale kierunki i akcje oraz zasade kosztu.
}
function status_gry() {
  // OK TODO A3: wypisz pokoj, energie, przedmioty, zasilanie i stan gry.
  console.log(`Aktualny pokoj: ${pokoj} - ${nazwaPokoju(pokoj)}`)
  console.log(`Energia: ${energia}`);
  console.log(`Karta: ${karta ? "tak" : "nie"}`)
  console.log(`Bezpiecznik: ${bezpiecznik ? "tak" : "nie"}`)
  console.log(`Zasilanie: ${zasilanie ? "tak" : "nie"}`)
  console.log(`Stan gry: ${koniec ? "koniec" : "trwa"}`)
  console.log(`Ilosc Ruchow: ${iloscRuchow}`);

}
function mapa() {
  // OK TODO A2: petla for od 1 do 4; nazwa i znacznik aktualnego pokoju.
  for (let numer: number = 1; numer <= 4; numer++) {
    console.log(`Pokoj '${nazwaPokoju(numer)}' nr. ${numer} ${numer === pokoj ? " <-- jestes tutaj" : ""}`);

  }
}
function rozejrzyj() {
  // OK TODO A4: switch(pokoj); opis zgodny ze stanem przedmiotow.
  switch (pokoj) {
    case 1: { // recepcja
      if (karta === false) {
        console.log("karta lezy na stole");
      } else {
        console.log("nic tu nie ma");
      }
      break;
    }
    case 2: { // magazyn
      if (bezpiecznik === false && zasilanie === false) {
        console.log("bezpiecznik lezy na polce")
      } else {
        console.log("nic tu nie ma");
      }
      break;
    }
    case 3: { // serwerownia
      if (zasilanie) 
        console.log("zasilanie dziala");
      else 
        console.log("zasilanie nie dziala");
      break;
    }
    case 4: { // wyjscie
      if (bezpiecznik && karta && zasilanie)
        console.log("wygrales")
      else 
        console.log("musisz zamontowac bezpiecznik, wlaczyc zasilanie i uzyc karty do wyjscia");
      break;
    }
  }
}

// SEKCJA B — RUCH
function idz(kierunek: string) {
  // TODO B1: zablokuj ruch po koncu gry.
  if (koniec) return;


  // dlaczego tak??
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.


  // OK TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
  // OK TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  if (!["lewo", "prawo"].includes(kierunek))
    return;
  
  if (kierunek === "lewo" && pokoj == 1)
    return;

  if (kierunek === "prawo" && pokoj == 4)
    return;

  if (kierunek === "lewo") pokoj -= 1;
  else pokoj += 1;


  rozejrzyj();
  zakonczTure();  
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co: string) {
  // TODO C1: zablokuj akcje po koncu gry.
  if (koniec) return;
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  switch (co) {
    case "karta": {
      if (pokoj !== 1 || karta) {
        console.log("nie ma karty tutaj");
        return;
      }
      karta = true;
      console.log("podnosisz karte");
      break;
    }
    case "bezpiecznik": {
      if (pokoj !== 2 || zasilanie) {
        console.log("nie ma tutaj bezpiecznika");
        return;
      }
      bezpiecznik = true;
      console.log("podnosisz bezpiecznik");
      break;
    }
    case "napraw": {
      if (pokoj !== 3 || !bezpiecznik || zasilanie) {
        console.log(`${pokoj} || ${!bezpiecznik} || ${zasilanie}`)
        console.log("nie mozesz naprawic");
        return;
      }
      bezpiecznik = false;
      zasilanie = true;

      console.log("naprawiasz prad");
      break;
    }
    case "wyjdz": {
      if (pokoj !==4 || karta == false || zasilanie === false) {
        console.log("nie mozesz jeszcze wyjsc");
        return;
      }
      wygrana = true;
      koniec = true;
      break;
    }
  }
  zakonczTure();
  // OK TODO C2: przed zmiana sprawdz pokoj i wymagany stan.
  // OK TODO C3: przy odrzuceniu return; przy sukcesie break.
  // OK TODO C3: po switch jedno zakonczTure().
  // OK TODO C4: wygrana i koniec ustawione przed rozliczeniem tury!
}

start();
 