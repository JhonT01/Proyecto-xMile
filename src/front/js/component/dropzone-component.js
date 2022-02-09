import React from "react";

export const Dropzone = ({
  acceptedFiles,
  fileRejections,
  getRootProps,
  getInputProps,
  open,
}) => {
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="contenedor-form border text-center mt-5 sombra-dark">
      <div
        {...getRootProps({
          className:
            "dropzone container border border-dark rounded-3 bg-light.bg-gradient",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.xml files will be accepted)</em>
      </div>
      <div className="container mt-2 mb-2">
        <button type="button" className="btn" onClick={open}>
          Seleccionar archivos
        </button>
      </div>

      <aside>
        <div className="mb-4">
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
        </div>
        <div className="mb-4">
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </div>
      </aside>
    </section>
  );
};
