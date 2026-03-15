# Cloud Task Manager - by Karol Żyłuk
 
Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.
 
## Deklaracja Architektury (Mapowanie Azure)
Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.
 
| Warstwa | Komponent Lokalny | Usługa Azure |
| :--- | :--- | :--- |
| **Presentation** | React 19 (Vite) | Azure Static Web Apps |
| **Application** | API (.NET 9 / Node 24) | Azure App Service |
| **Data** | SQL Server (Dev) | Azure SQL Database (Serverless) |
 
## 🏗 Status Projektu i Dokumentacja
* [x] **Artefakt 1:** Zaplanowano strukturę folderów i diagram C4 (dostępny w `/docs`).
* [ ] **Artefakt 2:** Konfiguracja środowiska Docker (w trakcie...).
* [ ] Artefakt 3: Stworzony widok (Page) wyświetlający listę danych z API, z poprawną komunikacją Axios (GET).
 
> **Informacja:** Ten plik będzie ewoluował. W kolejnych etapach dodamy tutaj sekcje 'Quick Start', opis zmiennych środowiskowych oraz instrukcję wdrożenia (CI/CD).

# Cloud App – Projekt aplikacji chmurowej

Projekt aplikacji chmurowej realizowany w architekturze 3-warstwowej.

## Struktura projektu

cloud-app/
- frontend/ – aplikacja frontendowa
- backend/ – API backendowe
- database/ – konfiguracja bazy danych
- docker-compose.yml – konfiguracja środowiska Docker
- README.md – dokumentacja projektu

---

## Uruchomienie projektu

Aby uruchomić projekt lokalnie należy użyć Docker Compose.

### Budowanie i uruchomienie kontenerów

docker compose up -d --build

### Sprawdzenie statusu kontenerów

docker compose ps

---

## Status projektu

- Artefakt 1: Architektura i struktura folderów
- Artefakt 2: Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose)
- Artefakt 3: Stworzony widok (Page) wyświetlający listę danych z API, z poprawną komunikacją Axios (GET).
Uruchomione kontenery:
- frontend
- backend
- database

---

## Technologie

- Docker
- Docker Compose
- Backend
- Frontend
- Azure SQL Edge
