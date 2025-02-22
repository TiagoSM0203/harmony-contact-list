
import { Contact, ContactForm } from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addContact, updateContact, deleteContact } from '@/store/contactsSlice';
import { toast } from "sonner";

const Index = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const handleAddContact = (newContact: Contact) => {
    dispatch(addContact(newContact));
    toast.success("Contato adicionado com sucesso!");
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    dispatch(updateContact(updatedContact));
    toast.success("Contato editado com sucesso!");
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
    toast.success("Contato deletado com sucesso!");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Contatos</h1>
          <p className="text-muted-foreground">
            Adione ou remova contatos a sua lista.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Adicione um novo contato</h2>
            <ContactForm onSubmit={handleAddContact} />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Lista de contatos</h2>
            {contacts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhum contato adicionado, adicione algum.
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
