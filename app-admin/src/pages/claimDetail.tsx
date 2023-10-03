import ClaimDetail from "@/components/funcional/ClaimDetail.tsx";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useClaim } from "@/store/hooks";

const PageClaimDetail = () => {
  const router = useRouter();
  const { claimId } = router.query;
  const { getByIdClaim, claimData } = useClaim();
  useEffect(() => {
    if (claimId) {
      getByIdClaim(claimId.toString());
    }
  }, [router]);

  if (claimData.claim_id && router.isReady) {
    return <ClaimDetail />;
  }
};

export default PageClaimDetail;
