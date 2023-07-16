# Ambiente di Sviluppo

- **Sistema Operativo**: Windows 11
- **IDE**: Visual Studio Code (V.1.80.1)
- **Node**: v18.16.0
- **NPM**: 9.7.2

# Frontend

- **Angular**: V16.0.0
- **Angular Material**: v16.1.5

# Backend (con Database)

- **NestJs**: v10.0.0
- **SQLite3**: v5.1.6
- **TypeORM**: v0.3.17
- **NestJS Config**: v3.0.0

# Backend (senza Database)

- **NestJs**: v10.0.0
- **NestJS Config**: v3.0.0

# Struttura del Frontend

## Componenti (`src/app/components`)

- **button-add-task**: Incapsula e richiama il dialog task per l'esecuzione della chiamata POST per aggiungere un nuovo task.

- **dialog-add-task**: Questo componente si occupa della gestione del modulo per l'aggiunta di un nuovo task. Il modulo utilizza un form di tipo `FormGroup` che contiene cinque `FormControl`: 'title', 'description', 'createdAt', 'priority', e 'status', tutti con validazione obbligatoria.

  All'invio del modulo, il metodo `postTask()` controlla se il modulo è valido. Se lo è, estrae i valori del modulo come un oggetto di tipo `Task`, e chiama il metodo `addTask()` del `TaskService`, passando il task come parametro. In seguito, si sottoscrive all'`Observable` restituito da `addTask()` per gestire la risposta del server. Se la richiesta va a buon fine, invia un segnale tramite `emitterRefreshTable` del `TaskService` per avvisare gli altri componenti di aggiornare i loro dati. Inoltre, visualizza un messaggio di successo tramite un `MatSnackBar`. Se la richiesta fallisce, mostra un messaggio di errore utilizzando lo stesso `MatSnackBar`.

  In caso di invio di un modulo non valido, viene stampato un messaggio di errore sulla console.

  Il componente inoltre utilizza il `MatSnackBar` per fornire un feedback all'utente, mostrando messaggi brevi per un periodo di tempo limitato. Il messaggio e la durata dello snack bar sono controllati dalle proprietà `snackBarMessage` e `durationInSeconds`. La funzione `openSnackBar()` è utilizzata per visualizzare lo snack bar con il messaggio attuale per la durata specificata.

- **button-delete-task**: Incapsula e richiama il dialog delete task per eliminare un task con uno specifico ID.

- **dialog-delete-task**: Questo componente si occupa della logica di eliminazione di un task esistente. Il task viene eliminato utilizzando il metodo `deleteTask()` del servizio `task service`. Il componente riceve l'oggetto task come input dal componente padre attraverso la proprietà `@Input() task`.

  Il componente utilizza il servizio `MatDialog` per aprire una finestra di dialogo che chiede all'utente di confermare l'eliminazione del task. Il metodo `openDeleteDialog()` viene utilizzato per aprire la finestra di dialogo. Questo metodo accetta due parametri, `enterAnimationDuration` e `exitAnimationDuration`, che controllano la durata dell'animazione di entrata e uscita della finestra di dialogo.

  Quando si apre la finestra di dialogo, viene passato l'oggetto task al componente `DialogDeleteTaskComponent` attraverso la proprietà `data`. Questo permette al `DialogDeleteTaskComponent` di utilizzare le informazioni del task per completare l'operazione di eliminazione.

- **button-edit-task**: Incapsula e richiama il dialog edit task per modificare un task con uno specifico ID.

- **dialog-edit-task**: Gestisce la logica per la modifica di un task eseguendo una chiamata PUT. Utilizza il metodo `updateTask()` del servizio `task service` per inviare una richiesta di aggiornamento al server. Questa richiesta contiene l'oggetto `Task` aggiornato, che viene passato come argomento al metodo. L'URL della richiesta è generato dinamicamente, includendo l'ID del task da modificare. Il metodo è configurato per restituire un `Observable` di tipo `Task`, assicurando che i dati ricevuti in risposta siano conformi alla struttura definita dall'interfaccia `Task`.
- **checkbox-filter-task-table**: Questo componente è responsabile per la gestione dei filtri nel componente della tabella dei task, che si trova nella sidebar dell'applicazione. Si interfaccia con il servizio `TaskTableService` per ricevere i dati attuali del dataSource del componente task-table attraverso un `BehaviorSubject`. Il componente implementa filtri per le proprietà 'priority' e 'status' dei task. Questi filtri possono essere attivati e disattivati dall'utente. Quando attivi, filtrano i dati visualizzati nella tabella in base alle selezioni dell'utente.

  All'inizio della vita del componente, il `TaskTableService` fornisce il dataSource corrente e il componente esegue diverse operazioni su questi dati: estrae i valori univoci per le proprietà 'priority' e 'status' dei task e calcola la quantità di task per ogni valore di 'priority' e 'status'. Queste informazioni sono utilizzate per popolare e aggiornare le opzioni del filtro disponibili.

  Il componente fornisce anche metodi per gestire l'attivazione e la disattivazione dei filtri e per applicare i filtri attivi ai dati del dataSource. Quando i filtri vengono applicati, i dati visualizzati nella tabella vengono aggiornati per riflettere le selezioni di filtro dell'utente.

  Durante la distruzione del componente, la sottoscrizione al dataSource viene annullata per evitare potenziali perdite di memoria.

- **current-date**: Componente che si occupa di ottenere la data e l'ora corrente e stamparla nel formato dd/mm/yy.

- **task-search-input**: Questo componente fornisce un campo di input per il filtraggio dei task in base ai valori dei campi "Title" e "Description". Esso interagisce strettamente con il servizio `TaskTableService` per ottenere i dati attuali del dataSource del componente task-table.

  All'avvio del componente, si sottoscrive al dataSource corrente fornito dal `TaskTableService`. Successivamente, personalizza il `filterPredicate` della dataSource per eseguire la ricerca solo sui campi 'title' e 'description' dei task. Il `filterPredicate` è una funzione che determina se un task dovrebbe essere visualizzato in base al valore corrente del filtro.

  Il componente fornisce un metodo `searchDataTodo`, che viene attivato ogni volta che l'utente digita nel campo di input. Questo metodo recupera il valore corrente del campo di input, lo trasforma in minuscolo, rimuove eventuali spazi bianchi all'inizio e alla fine, e lo imposta come il valore del filtro del dataSource. In questo modo, solo i task il cui 'title' o 'description' contengono il valore del filtro vengono visualizzati nella tabella.

  Se la tabella ha un paginatore, `searchDataTodo` fa in modo che la visualizzazione ritorni alla prima pagina ogni volta che il filtro cambia. Questo assicura che l'utente veda sempre i risultati più pertinenti al valore del filtro corrente.

- **task-table**: Questo componente rappresenta la tabella principale che visualizza l'elenco dei task. Utilizza una richiesta GET tramite il metodo `getTasks()` del `TaskService` per ottenere i dati dei task.

  Al momento dell'inizializzazione, il componente esegue il metodo `getTasks()`, che si sottoscrive al `Observable` restituito dal `TaskService.getTasks()`. Una volta che i dati dei task vengono ricevuti, vengono assegnati alla proprietà `tasks` del componente, che viene poi utilizzata per creare una nuova `MatTableDataSource`. Questa nuova `MatTableDataSource` viene impostata come `dataSource` del componente e viene anche passata al `TaskTableService` per essere condivisa con altri componenti. L'ordinamento e la paginazione della tabella sono gestiti rispettivamente attraverso le proprietà `sort` e `paginator` della `dataSource`.

  La tabella visualizza sei colonne: 'title', 'description', 'createdAt', 'priority', 'status' e 'actions'. Viene fornita una funzionalità per gestire le descrizioni dei task che superano una certa lunghezza, tramite l'attributo `isTextTooLong`.

  Inoltre, il componente si sottoscrive a `emitterRefreshTable` del `TaskService`, che viene utilizzato per segnalare quando i dati dei task devono essere ricaricati. Quando viene ricevuto un evento da `emitterRefreshTable`, il componente esegue nuovamente il metodo `getTasks()` per aggiornare i dati visualizzati nella tabella.

  Infine, il componente personalizza il `filterPredicate` della `dataSource` per filtrare i task in base a specifiche `priority` e `status`. Questo `filterPredicate` viene utilizzato quando altri componenti applicano filtri alla `dataSource`.

## Pages (`src/app/pages`)

- **page-task**: Questo componente agisce come un contenitore che raggruppa e organizza i seguenti sottocomponenti:

  - `app-current-date`: Un componente che mostra la data corrente.
  - `app-task-table`: Un componente che gestisce e visualizza la tabella dei task.
  - `app-button-add-task`: Un componente che fornisce un pulsante per aggiungere nuovi task.

## Environments (`src/app/environments`)

In questo file è possibile modificare l'indirizzo del server. Di default viene assegnato l'indirizzo http://localhost:3000/task

## Servizi (`src/app/services`)

- **task-table-service.service.ts**: Questo servizio è responsabile per la gestione e la condivisione del dataSource della tabella dei task tra i vari componenti. Utilizza il pattern BehaviorSubject di RxJS per gestire lo stato del dataSource. L'oggetto BehaviorSubject mantiene l'ultimo valore emesso a qualsiasi nuovo osservatore, consentendo così di mantenere sincronizzato lo stato del dataSource attraverso i componenti. Il servizio espone un metodo `changeDataSource()`, che permette di aggiornare il dataSource corrente invocando il metodo `next()` dell'oggetto BehaviorSubject.

- **task-interface.ts**: Questa interfaccia definisce la struttura standard di un oggetto `Task` all'interno dell'applicazione. Un oggetto `Task` è caratterizzato dai seguenti campi:
  - `id`: un numero univoco che identifica il task.
  - `title`: una stringa che rappresenta il titolo del task.
  - `description`: una stringa che fornisce una descrizione dettagliata del task.
  - `createdAt`: un oggetto `Date` che indica la data e l'ora di creazione del task.
  - `priority`: una stringa che rappresenta la priorità del task, può assumere i valori 'low', 'medium', o 'high'.
  - `status`: una stringa che indica lo stato attuale del task, può essere 'todo', 'doing' o 'done'.
- **task-service.ts**: Questo servizio che fornisce una serie di metodi per l'interazione con l'API dei task. Sfrutta il modulo `HttpClient` di Angular per eseguire le richieste HTTP. I metodi disponibili sono:

  - `getTasks()`: Ritorna un `Observable` di un array di oggetti `Task`, rappresentando l'insieme di tutti i task.
  - `getTask(id: number)`: Prende come argomento un numero (id del task) e ritorna un `Observable` di un singolo oggetto `Task`. Questo metodo è utilizzato per ottenere i dettagli di un task specifico.
  - `addTask(task: Task)`: Accetta un oggetto `Task` come argomento e ritorna un `Observable` del task aggiunto. È utilizzato per aggiungere un nuovo task.
  - `updateTask(task: Task)`: Accetta un oggetto `Task` come argomento e ritorna un `Observable` del task aggiornato. È utilizzato per aggiornare un task esistente.
  - `deleteTask(id: number)`: Prende come argomento un numero (id del task) e ritorna un `Observable` del task eliminato. È utilizzato per eliminare un task esistente.

  Inoltre, il servizio include un `Subject` denominato `emitterRefreshTable`, utilizzato per segnalare agli altri componenti quando la tabella dei task deve essere aggiornata.

  L'URL di base per le richieste API viene prelevato dalle variabili di ambiente dell'applicazione, con un fallback sull'URL locale `http://localhost:3000/task` se non è disponibile.

# Pagina Principale dell'Applicazione Todo

Questa è la pagina principale dell'applicazione Todo, che segue un approccio di architettura Single Page Application (SPA). L'intero layout è definito all'interno del file `app.component.html`.

Il layout comprende un container (`mat-drawer-container`) che include un blocco di navigazione (`mat-drawer`) che funge da sidebar, e un container principale (`mat-drawer-content`). Il container contiene i componenti :

- `app-task-search-input`: che offre agli utenti la possibilità di cercare specifici task.
- `app-checkbox-filter-task-table`: che permette di filtrare i task visualizzati in base a criteri specifici.

Inoltre è presente un pulsante che consente di aprire o chiudere la sidebar.

# Backend (con Database)

- **NestJs**: v10.0.0
- **SQLite3**: v5.1.6
- **TypeORM**: v0.3.17
- **NestJS Config**: v3.0.0

# Struttura del backend con db

- src/entity

# TaskEntity

`TaskEntity` è un'entità definita per la gestione dei task, utilizzando TypeORM per rappresentare e interagire con la corrispondente tabella 'Task' nel database.

I campi dell'entità sono:

- `id`: chiave primaria autogenerata per ogni task.
- `title`: titolo del task (lunghezza massima 500 caratteri).
- `description`: descrizione dettagliata del task.
- `createdAt`: timestamp della creazione del task.
- `priority`: priorità del task ('low', 'medium', 'high') con default 'medium'.
- `status`: stato del task ('todo', 'doing', 'done') con default 'todo'.

# task.controller.ts

Il task controller gestisce le seguenti rotte:

- `GET /task`: Recupera tutti i task.
- `GET /task/:id`: Recupera un singolo task dato il suo `id`.
- `POST /task`: Crea un nuovo task. Il corpo della richiesta deve corrispondere alla struttura del DTO `CreateTaskDto`.
- `PUT /task/:id`: Aggiorna un task esistente, identificato dal suo `id`. Il corpo della richiesta deve corrispondere alla struttura del DTO `UpdateTaskDto`.
- `DELETE /task/:id`: Elimina un task esistente dato il suo `id`.

# task.module.ts

Questo modulo permette l'importazione del TaskEntity nel modulo TypeORM, permettendo così l'interazione con il database.

# task.service.ts

`TaskService` gestisce la logica relativa alle operazioni sui task, sfruttando il repository TypeORM di `TaskEntity`. Le operazioni incluse sono:

- `getAllTasks()`: Recupera tutti i task dal repository.
- `getTaskById(id: number)`: Recupera un task specifico dal repository utilizzando il suo ID. Se non trova il task, lancia un'eccezione.
- `createTask(createTaskDto: CreateTaskDto)`: Crea un nuovo task utilizzando i dati forniti nel DTO e lo salva nel repository.
- `updateTask(id: number, updateTaskDto: UpdateTaskDto)`: Aggiorna un task esistente con l'ID specificato utilizzando i dati forniti nel DTO. Se non trova il task, lancia un'eccezione.
- `deleteTask(id: number)`: Rimuove un task specifico dal repository utilizzando il suo ID. Se non trova il task, lancia un'eccezione.

# create-task.dto.ts

`CreateTaskDto` è un DTO utilizzato per definire la struttura dei dati richiesta per creare un nuovo task. Include i seguenti campi:

- `id`: Il numero identificativo del task.
- `title`: Il titolo del task.
- `description`: Una descrizione dettagliata del task.
- `createdAt`: La data e l'ora in cui il task è stato creato.
- `priority`: Il livello di priorità del task. Può essere 'low', 'medium' o 'high'.
- `status`: Lo stato del task. Può essere 'todo', 'doing' o 'done'.

# update-task.dto.ts

`UpdateTaskDto` è un DTO utilizzato per definire la struttura dei dati necessaria per aggiornare un task esistente. Include i seguenti campi:

- `title`: Il titolo aggiornato del task.
- `description`: Una descrizione dettagliata aggiornata del task.
- `priority`: Il livello di priorità aggiornato del task. Può essere 'low', 'medium' o 'high'.
- `status`: Lo stato aggiornato del task. Può essere 'todo', 'doing' o 'done'.

# app.module.ts

Il modulo `AppModule` configura la connessione al database tramite il modulo `TypeOrmModule` e importa il `TaskModule` per gestire le operazioni relative ai task. Include inoltre il modulo `ConfigModule` per la gestione delle variabili di ambiente globali.

# main.ts

Il file `main.ts` è il punto di ingresso dell'applicazione. Configura la porta di ascolto dell'applicazione, abilita CORS e avvia l'applicazione. Quando l'applicazione è avviata, viene stampato un messaggio di conferma sulla porta di ascolto.

# Backend (senza Database)

- **NestJs**: v10.0.0
- **NestJS Config**: v3.0.0

Il Backend privo di DB mantiene una struttura analoga a quello precendente.
