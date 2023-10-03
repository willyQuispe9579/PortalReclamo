import Claim from "@/components/funcional/Claim";
import { useClaim } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PageClaim = () => {
  const router = useRouter();
  const { getAllClaim, claimList } = useClaim();

  useEffect(() => {
    if (claimList.length === 0) {
      getAllClaim();
    }
  }, [router]);

  return <Claim />;
};

export default PageClaim;
