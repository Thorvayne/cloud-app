# Cloud Task Manager - by Karol Żyłuk
 
Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.
 
## Deklaracja Architektury (Mapowanie Azure)
Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.
 
| Warstwa | Komponent Lokalny | Usługa Azure |
| :--- | :--- | :--- |
| **Presentation** | React 19 (Vite) | Azure Static Web Apps |
| **Application** | API (.NET 9) | Azure App Service |
| **Data** | SQL Server (Docker) | Azure SQL Database (Serverless) |
 
---

## 🏗 Status Projektu i Dokumentacja

* [x] **Artefakt 1:** Zaplanowano strukturę folderów i architekturę aplikacji
* [x] **Artefakt 2:** Skonfigurowano środowisko Docker (multi-container)
* [x] **Artefakt 3:** Frontend (React) pobiera dane z API (Axios GET)
* [x] **Artefakt 4:** Backend + baza danych + komunikacja frontend-backend

---

## 🚀 Artefakt 4 – Backend i integracja

W ramach Artefaktu 4 wykonano:

### ✔ Backend API (ASP.NET Core)
- Zaimplementowano REST API
- Utworzono kontroler `TasksController`
- Dostępne endpointy:
  - GET /api/Tasks
  - GET /api/Tasks/{id}
  - POST /api/Tasks
  - PUT /api/Tasks/{id}
  - DELETE /api/Tasks/{id}

### ✔ Swagger
- Udostępniono dokumentację API pod:
  http://localhost:8081/swagger

### ✔ Baza danych (Docker)
- SQL Server działa w kontenerze `cloud-db`
- Backend łączy się przez connection string:
  `Server=cloud-db,1433`

### ✔ Entity Framework
- Konfiguracja `AppDbContext`
- Automatyczne tworzenie bazy:
  `Database.EnsureCreated()`

### ✔ Frontend ↔ Backend
- React komunikuje się z API przez Axios
- Endpoint:
  http://localhost:8081/api/Tasks
- Dane są poprawnie pobierane i wyświetlane

### ✔ Obsługa błędów
- Dodano obsługę błędów w frontendzie (`catch`)
- Dodano politykę CORS w backendzie

---

## 📂 Struktura projektu

cloud-app/
- frontend/ – aplikacja frontendowa (React + Vite)
- backend/ – API (.NET)
- docker-compose.yml – konfiguracja Docker
- README.md – dokumentacja projektu

---
## Artefakt 5 – Usprawnienia backendu i przygotowanie do chmury

W ramach Artefaktu 5 wykonano następujące zadania:

- wprowadzono DTO (`TaskReadDto`) zamiast zwracania bezpośrednio encji bazy danych,
- zaktualizowano metody `GetAll` i `GetById` w `TasksController`,
- dodano trwałość danych przy użyciu Docker Volume (`sql-data`),
- wdrożono migracje Entity Framework Core (`InitialCreate`),
- zamieniono `EnsureCreated()` na `Migrate()`,
- rozbudowano frontend React o formularz dodawania nowych zadań,
- użytkownik może dodawać zadania bez użycia Swaggera,
- po dodaniu zadania lista danych jest automatycznie odświeżana.

Artefakt 5 przygotowuje projekt do wdrożenia w środowisku chmurowym Azure.
---
## Artefakt 6 – Wdrożenie aplikacji w chmurze Azure

W ramach Artefaktu 6 wykonano następujące zadania:

utworzono bazę danych w Azure SQL Database oraz skonfigurowano dostęp poprzez Firewall,
dodano reguły sieciowe umożliwiające połączenie z poziomu aplikacji oraz środowiska Azure,
skonfigurowano połączenie z bazą danych w pliku appsettings.Development.json,
wykonano migrację bazy danych przy użyciu Entity Framework Core (dotnet ef database update),
wdrożono backend (.NET Web API) do Azure App Service,
backend został udostępniony publicznie poprzez protokół HTTPS,
wdrożono frontend (React) do środowiska Azure,
skonfigurowano integrację frontend–backend przy użyciu zmiennej środowiskowej VITE_API_URL,
aplikacja frontendowa poprawnie komunikuje się z backendem i pobiera dane z bazy Azure SQL,
zaktualizowano repozytorium GitHub o finalną wersję projektu wraz z dokumentacją.

Artefakt 6 stanowi finalny etap projektu i potwierdza poprawne wdrożenie aplikacji w środowisku chmurowym Azure oraz pełną integrację wszystkich komponentów systemu.

## ▶ Uruchomienie projektu

### Budowanie i uruchomienie kontenerów
