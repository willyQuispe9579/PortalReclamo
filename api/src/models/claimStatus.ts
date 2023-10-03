import pool from "../utils/database";

const create: any = async (claim_id: string, status: string) => {
  try {
    const resultDataBase = await pool.query(
      `INSERT INTO app.claim_status (claim_id, status)
      VALUES ($1, $2)
      ON CONFLICT (claim_id) DO UPDATE SET
          status = EXCLUDED.status RETURNING *;`,
      [claim_id, status]
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
