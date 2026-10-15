import "./App.css";
import { useEffect, useState } from "react";
import ClientForm from "./Components/ClientForm";
import ClientList from "./Components/ClientList";
import type { Client, ClientFormData } from "./Type/Client";
import "./Components/Client.css";

function App() {
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("clients") || "[]") as Client[];
    } catch {
      return [];
    }
  });

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  function addClient(data: ClientFormData) {
    const newClient: Client = {
      ...data,
      id: String(
        Math.max(0, ...clients.map((client) => Number(client.id))) + 1
      ),
      createdAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    };

    setClients((previousClients) => [...previousClients, newClient]);
  }

  function updateClient(updatedClient: Client) {
    setClients((previousClients) =>
      previousClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  }

  function deleteClient(id: string) {
    setClients((previousClients) =>
      previousClients.filter((client) => client.id !== id)
    );
  }

  function openAddForm() {
    setEditingClient(null);
    setIsFormOpen(true);
  }

  function startEditing(client: Client) {
    setIsFormOpen(false);
    setEditingClient(client);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingClient(null);
  }

  const activeCount = clients.filter((client) => client.status === "Active").length;
  const leadCount = clients.filter((client) => client.status === "Lead").length;

  return (
    <main className="app-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">CLIENT MANAGEMENT</p>
            <h1>ClientDesk</h1>
            <p className="subtitle">
              Keep track of your clients and build better relationships.
            </p>
          </div>
          <button className="primary-button" onClick={openAddForm}>
            <span aria-hidden="true">＋</span> Add Client
          </button>
        </header>

        <section className="stats-grid" aria-label="Client statistics">
          <article className="stat-card">
            <span className="stat-label">Total clients</span>
            <strong>{clients.length}</strong>
            <span className="stat-note">All saved client records</span>
          </article>
          <article className="stat-card">
            <span className="stat-label">Active clients</span>
            <strong>{activeCount}</strong>
            <span className="stat-note">Currently active</span>
          </article>
          <article className="stat-card">
            <span className="stat-label">Leads</span>
            <strong>{leadCount}</strong>
            <span className="stat-note">Potential clients</span>
          </article>
        </section>

        {isFormOpen && (
          <section className="inline-form-card">
            <ClientForm
              editingClient={null}
              onAddClient={addClient}
              onUpdateClient={updateClient}
              onClose={closeForm}
            />
          </section>
        )}

        <ClientList
          clients={clients}
          onDeleteClient={deleteClient}
          onEditClient={startEditing}
        />

        {editingClient && (
          <div
            className="modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeForm();
            }}
          >
            <section
              className="modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-client-title"
            >
              <ClientForm
                key={editingClient.id}
                editingClient={editingClient}
                onAddClient={addClient}
                onUpdateClient={updateClient}
                onClose={closeForm}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
