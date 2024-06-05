export type Partner = {
    id: string;
    name: string;
    edi_version: string;
    delimiters: string;
    EOL: string;
    type_of_connection: string;
    PO_Test: any;
    hidden: boolean;
    EDI_documents: EDI_Document[];
};

export type Client = {
    id: string;
    name: string;
    partnerships: AssociatedPartner[];
};
  
export type AssociatedPartner = {
    id: string;
    partner: Partner | null;
    uploaded_documents: document[];
};

export type document = {
    id: string;
    type: string;
    json_document: any;
    errors: Error[];
}

export type Error = {
    id: string;
    code: string;
    message: string;
}

export type EDI_Document = {
    id: string;
    type: string;
    template: boolean;
    structure: Segment[];
};

export type Segment = {
    id: string;
    name: string;
    template: boolean;
    rules: any;
}