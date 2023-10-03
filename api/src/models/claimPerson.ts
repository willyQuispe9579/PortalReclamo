import pool from "../utils/database";
const create: any = async (claim_id: string, person_id: string) => {
  try {
    const resultDataBase = await pool.query(
      `INSERT INTO app.claim_person ( claim_id, person_id)
      VALUES ($1,$2)
      ON CONFLICT (claim_id) DO UPDATE
      SET person_id = EXCLUDED.person_id  RETURNING *;`,
      [claim_id, person_id]
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
