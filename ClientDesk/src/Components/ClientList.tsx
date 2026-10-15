import { useMemo, useState } from "react";
import type { Client } from "../Type/Client";
import "./Client.css";

interface ClientListProps {
  clients: Client[];
  onDeleteClient: (id: string) => void;
  onEditClient: (client: Client) => void;
}

const ClientList = ({
  clients,
  onDeleteClient,
  onEditClient,
}: ClientListProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch = [
        client.name,
        client.company,
        client.email,
        client.service,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesStatus =
        statusFilter === "All" || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  function handleDelete(client: Client) {
    const confirmed = window.confirm(
      `Delete ${client.name} from your client list?`
    );

    if (confirmed) onDeleteClient(client.id);
  }

  return (
    <section className="client-list-card">
      <div className="list-heading">
        <div>
          <h2>Clients</h2>
          <p className="muted-text">
            {filteredClients.length} of {clients.length} client
            {clients.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="list-controls">
          <input
            className="search-input"
            type="search"
            placeholder="Search clients..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search clients"
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◎</div>
          <h3>{clients.length === 0 ? "No clients yet" : "No matching clients"}</h3>
          <p>
            {clients.length === 0
              ? "Add your first client to get started."
              : "Try another search term or status filter."}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Status</th>
                <th>Created</th>
                <th className="actions-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-identity">
                      <div className="avatar" aria-hidden="true">
                        {client.name.trim().slice(0, 2).toUpperCase()}
                      </div>
                      <div className="client-primary">
                        <strong>{client.name}</strong>
                        <span>{client.company}</span>
                        <span>{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{client.service}</td>
                  <td>
                    <span className={`status-badge status-${client.status.toLowerCase()}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="created-cell">{client.createdAt}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="table-button edit-button"
                        onClick={() => onEditClient(client)}
                      >
                        Edit
                      </button>
                      <button
                        className="table-button delete-button"
                        onClick={() => handleDelete(client)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ClientList;
