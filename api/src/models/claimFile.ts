import pool from "../utils/database";

const create: any = async (
  claim_id: string,
  url: string,
  public_id: string
) => {
  try {
    const resultDataBase = await pool.query(
      `INSERT INTO app.claim_file
      (claim_id, url, public_id)
      VALUES($1, $2, $3) RETURNING *;`,
      [claim_id, url, public_id]
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

const getById: any = async (claim_id: string) => {
  try {
    const resultDataBase = await pool.query(
      `SELECT id, claim_id, url, public_id
      FROM app.claim_file WHERE claim_id=$1;`,
      [claim_id]
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

const remove: any = async (public_id: string) => {
  try {
    const resultDataBase = await pool.query(
      `DELETE FROM app.claim_file
      WHERE public_id=$1;`,
      [public_id]
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

export { create, getById, remove };
