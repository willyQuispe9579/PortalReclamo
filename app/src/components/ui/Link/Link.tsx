import styles from "./Link.module.scss";

interface IntLink {
  valor: string;
  onClick: () => void;
}

const Link = ({ valor, onClick }: IntLink) => {
  return (
    <div className={styles.link}>
      <a onClick={onClick}>{valor}</a>
    </div>
  );
};

export default Link;
