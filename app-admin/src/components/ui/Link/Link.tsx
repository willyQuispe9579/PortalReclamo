import styles from "./Link.module.scss";

interface IntLink {
  valor: string;
  onClick: any;
}

const Link = ({ valor, onClick }: IntLink) => {
  return (
    <div className={styles.link} onClick={onClick}>
      <a>{valor}</a>
    </div>
  );
};

export default Link;
