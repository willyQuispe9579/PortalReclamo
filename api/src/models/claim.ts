import pool from "../utils/database";
const create: any = async () => {
  try {
    const resultDataBase = await pool.query(
      `INSERT INTO app.claim
      ( openingdate, endingdate)
      VALUES( NOW(), NOW()) RETURNING *;`
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

const deleteClaim: any = async (id: string) => {
  try {
    const result = "respuestas";

    return {
      success: true,
      data: id || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const update: any = async (
  claim_id: string,
  person_id: string,
  type_id: string,
  body_claim: string
) => {
  try {
    const resultDataBase = await pool.query(
      `UPDATE claim
      SET person_id=$2, type_id=$3, body_claim=$4
      WHERE id=$1 RETURNING *;`,
      [claim_id, person_id, type_id, body_claim]
    );

    return {
      success: true,
      data: resultDataBase.rows || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (claim_id: string) => {
  try {
    const resultDataBase = await pool.query(
      `SELECT app.fn_get_by_id_claim($1)::jsonb AS "data"; `,
      [claim_id]
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

const getAll: any = async () => {
  try {
    const resultDataBase = await pool.query(
      `SELECT app.fn_get_all_claims()::jsonb AS "data"; `
    );
    return {
      success: true,
      data: resultDataBase.rows[0].data || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
export { create, deleteClaim, update, getById, getAll };
