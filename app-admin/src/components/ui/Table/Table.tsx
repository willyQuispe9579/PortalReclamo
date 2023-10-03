import { ITable, ITableHeader } from "../../../interfaces/table";
import ButtonIcon from "../ButtonIcon";

const onChangeUpdate = (id: string) => {};

const onChangeDelete = (id: string) => {};

const Table = (data: ITable) => {
  return (
    <table>
      <thead>
        <tr>
          {data.header?.map((header, idx: number) => (
            <TableHeader key={idx} text={header.text} width={header.width} />
          ))}
        </tr>
      </thead>
      <TableDetail header={data.header} detail={data.detail} />
    </table>
  );
};

const TableHeader = ({ text, width }: ITableHeader) => {
  return <th style={{ width }}>{text}</th>;
};

const TableDetail = ({ header, detail }: any) => {
  return (
    <tbody>
      {detail?.map((row: any, idx: any) => (
        <tr key={idx}>
          {row.rowData.map((data: any, idx: any) => (
            <td
              key={idx}
              style={{ width: header[idx].width, textAlign: header[idx].align }}
            >
              {data}
            </td>
          ))}
          <ButtonIcon
            typeButton="square"
            onClick={() => onChangeUpdate(row.rowData[0])}
            icon="edit"
          />
          <ButtonIcon
            typeButton="square"
            onClick={() => onChangeDelete(row.rowData[0])}
            icon="delete"
          />
        </tr>
      ))}
    </tbody>
  );
};

export { Table, TableHeader, TableDetail };
