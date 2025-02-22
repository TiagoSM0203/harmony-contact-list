
import { useState } from "react";
import { Contact, ContactForm } from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";
import { toast } from "sonner";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    toast.success("Contact added successfully");
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    toast.success("Contact updated successfully");
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your contacts efficiently.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Add New Contact</h2>
            <ContactForm onSubmit={handleAddContact} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Contact List</h2>
            {contacts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No contacts yet. Add your first contact above.
              </p>
            ) : (
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={handleDeleteContact}
                    onUpdate={handleUpdateContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
