import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Client, ClientFormData } from "../Type/Client";
import "./Client.css";

interface ClientFormProps {
  onAddClient: (data: ClientFormData) => void;
  onUpdateClient: (client: Client) => void;
  onClose: () => void;
  editingClient: Client | null;
}

const ClientForm = ({
  onAddClient,
  onUpdateClient,
  onClose,
  editingClient,
}: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>();

  useEffect(() => {
    if (editingClient) {
      reset({
        name: editingClient.name,
        company: editingClient.company,
        email: editingClient.email,
        service: editingClient.service,
        status: editingClient.status,
      });
    } else {
      reset();
    }
  }, [editingClient, reset]);

  function submitForm(data: ClientFormData) {
    if (editingClient) {
      onUpdateClient({
        ...editingClient,
        ...data,
      });
      alert(`${data.name} updated successfully!`);
    } else {
      onAddClient(data);
      alert(`${data.name} added successfully!`);
    }

    onClose();
  }

  return (
    <form className="client-form" onSubmit={handleSubmit(submitForm)} noValidate>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editingClient ? "EDIT RECORD" : "NEW RECORD"}</p>
          <h2>{editingClient ? "Edit client" : "Add a client"}</h2>
          <p className="form-description">
            {editingClient
              ? "Update the details below and save your changes."
              : "Enter the client's details below."}
          </p>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>
      </div>

      <div className="form-field">
        <label htmlFor="name">Client name</label>
        <input
          id="name"
          placeholder="e.g. Nemi Bavisi"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          placeholder="e.g. Glocyber technologies"
          {...register("company", {
            required: "Company is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />
        {errors.company && (
          <span className="error">{errors.company.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="client@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="service">Service</label>
        <select
          id="service"
          defaultValue=""
          {...register("service", { required: "Please select a service" })}
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="Website Development">Website Development</option>
          <option value="App Development">App Development</option>
          <option value="Automation">Automation</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="SEO">SEO</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Other">Other</option>
        </select>
        {errors.service && (
          <span className="error">{errors.service.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          defaultValue=""
          {...register("status", { required: "Status is required" })}
        >
          <option value="" disabled>
            Select a status
          </option>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && (
          <span className="error">{errors.status.message}</span>
        )}
      </div>

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="primary-button" type="submit">
          {editingClient ? "Save changes" : "Add client"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
