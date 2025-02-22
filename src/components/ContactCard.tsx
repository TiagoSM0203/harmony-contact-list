
import { useState } from "react";
import { Contact, ContactForm } from "./ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Mail, Phone, User } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onUpdate: (contact: Contact) => void;
}

export function ContactCard({ contact, onDelete, onUpdate }: ContactCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="contact-card mb-4">
        <ContactForm
          initialData={contact}
          onSubmit={(updatedContact) => {
            onUpdate(updatedContact);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <Card className="contact-card mb-4 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">{contact.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${contact.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {contact.phone}
              </a>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(contact.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
