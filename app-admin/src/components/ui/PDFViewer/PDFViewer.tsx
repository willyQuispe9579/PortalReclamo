import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import ButtonIcon from "../ButtonIcon";

import styles from "./PDFViewer.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IPdfViewer {
  file: string;
  width: number;
  height: number;
}

const PDFViewer = ({ file, width, height }: IPdfViewer) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div className={styles.pdfViewer} style={{ width, height }}>
      <Document file={file} onLoadSuccess={handleDocumentLoadSuccess}>
        <Page pageNumber={currentPage} width={width} height={height} />
      </Document>
      <div className={styles.controls}>
        <ButtonIcon
          onClick={handlePreviousPage}
          icon="keyboard_double_arrow_left"
          typeButton="square"
        />

        <h5>
          {currentPage} de {numPages}
        </h5>

        <ButtonIcon
          onClick={handleNextPage}
          icon="keyboard_double_arrow_right"
          typeButton="square"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
