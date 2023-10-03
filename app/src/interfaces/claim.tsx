export interface IClaim {
  claim_id: string;
  type_claim: string;
  type_claim_id: string;
  endingDate: string;
  body_claim: string;
  person_id: string;
  person_data: IPerson;
  level: string;
  status: string;
  claim_file_data: IFileClaim[];
}

interface IFileClaim {
  id: string;
  claim_id: string;
  url: string;
  public_id: string;
}

interface IPerson {
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  email: string;
  phone: string;
}

const initData = {
  claim_id: "",
  type_claim: "",
  type_claim_id: "",
  endingDate: "",
  body_claim: "",
  person_id: "",
  status: "",
  level: "",
  person_data: {
    id: "",
    rut: "",
    name: "",
    paternallastname: "",
    maternallastname: "",
    email: "",
    phone: "",
  },
  claim_file_data: [],
};

export { initData };
