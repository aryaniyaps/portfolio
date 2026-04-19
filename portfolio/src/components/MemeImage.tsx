import styles from "./MemeImage.module.css";

interface MemeImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function MemeImage({ src, alt, caption }: MemeImageProps) {
  return (
    <div className={styles.imageWrapper}>
      <img src={src} alt={alt} className={styles.image} />
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}