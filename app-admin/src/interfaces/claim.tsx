export interface IClaim {
  claim_id: string;
  person_id: string;
  body_claim: string;
  endingDate: string;
  type_claim: string;
  status: string;
  level: string;
  person_data: {
    id: string;
    rut: string;
    name: string;
    email: string;
    phone: string;
    maternallastname: string;
    paternallastname: string;
  };
  type_claim_id: string;
  claim_file_data: IClaimFile[];
}

interface IClaimFile {
  id: string;
  url: string;
  claim_id: string;
  public_id: string;
}

const initData = {
  claim_id: "",
  person_id: "",
  body_claim: "",
  endingDate: "",
  type_claim: "",
  level: "",
  status: "",
  person_data: {
    id: "",
    rut: "",
    name: "",
    email: "",
    phone: "",
    maternallastname: "",
    paternallastname: "",
  },
  type_claim_id: "",
  claim_file_data: [],
};

export { initData };
