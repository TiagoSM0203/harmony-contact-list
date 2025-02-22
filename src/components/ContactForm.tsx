
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  initialData?: Contact;
  onCancel?: () => void;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function ContactForm({ onSubmit, initialData, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState<Omit<Contact, "id">>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      ...formData,
    });
    
    if (!initialData) {
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-4 p-4 rounded-lg bg-card">
      <div className="space-y-2">
        <Input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? "Update Contact" : "Add Contact"}
        </Button>
      </div>
    </form>
  );
}
