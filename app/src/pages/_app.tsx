import "@/styles/globals.css";
import React, { useEffect } from "react";
import {
  useClaimData,
  useClaimDetail,
  useFile,
  usePerson,
} from "@/store/hooks";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import ScreenLoader from "@/components/layout/ScreenLoader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { getByIdClaim, claimData } = useClaimData();
  const { setDataClaimDetail } = useClaimDetail();
  const { setPerson } = usePerson();
  const { setFile } = useFile();
  const { claimId } = router.query;
  useEffect(() => {
    if (claimId) {
      getByIdClaim(claimId.toString());
    }
  }, [router]);

  useEffect(() => {
    if (claimData.claim_id !== "" && claimId) {
      setDataClaimDetail(
        claimId.toString(),
        claimData.body_claim,
        claimData.type_claim_id
      );
    }

    if (claimData.claim_file_data.length > 0) {
      setFile(claimData.claim_file_data);
    }
    if (claimData.person_data) {
      const { person_data: person } = claimData;
      setPerson(
        person.id,
        person.rut,
        person.name,
        person.paternallastname,
        person.maternallastname,
        person.email,
        person.phone
      );
    }
  }, [claimData]);

  return  <Component {...pageProps} />
}
