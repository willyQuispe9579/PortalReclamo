import pool from "../utils/database";
const create: any = async (
  claim_id: string,
  claim_body: string,
  type_id: string,
  level: string
) => {
  try {
    const resultDataBase = await pool.query(
      `INSERT INTO app.claim_detail ( claim_id, claim_body, type_id, level)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (claim_id) DO UPDATE
       SET claim_body = EXCLUDED.claim_body, type_id = EXCLUDED.type_id, level = EXCLUDED.level RETURNING *;`,
      [claim_id, claim_body, type_id, level]
    );

    return {
      success: true,
      data: resultDataBase.rows[0] || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
