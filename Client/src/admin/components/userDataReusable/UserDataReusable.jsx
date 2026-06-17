import React from "react";

export const SectionTitle = ({ title }) => {
  return (
    <h1 className="text-2xl text-red-200 font-semibold mx-4 text-center my-6 decoration-red-300">
      {title}
    </h1>
  )
};

export const InfoField = ({ label, value }) => {
  return (
    <p className="text-red-100">
      <span className="font-semibold">{label}:</span> {value || "N/A"}
    </p>
  );
}


export const ImageCard = ({ item }) => {
  return (
    <div className="p-4 rounded-lg shadow-md flex flex-col justify-center items-center bg-[#b52323] border border-red-300 hover:scale-105 transition-transform duration-300 ease-in-out w-64">
      <h2 className="text-lg font-semibold text-red-100 mb-1">{item.name}</h2>
      <InfoField label="Roll No" value={item.roll_no} />
      <InfoField label="Email" value={item.email} />
      <InfoField label="Contact" value={item.contact_no} />
      <img
        src={item.file_url || item.file}
        alt="uploaded artwork"
        className="w-full h-48 object-cover mt-2 rounded-lg"
      />
      {item.desc && <p className="text-sm text-red-50 mt-2 italic">{item.desc}</p>}
    </div>
  );
}


export const PoemCard = ({ item }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-[#b52323] border border-red-300 hover:scale-105 transition-transform duration-300 ease-in-out w-80">
      <h2 className="text-lg font-semibold text-red-100 mb-1">{item.name}</h2>
      <InfoField label="Roll No" value={item.roll_no} />
      <InfoField label="Email" value={item.email} />
      <InfoField label="Contact" value={item.contact_no} />
      <p className="text-white font-semibold mt-2">Title — {item.title}</p>
      <pre className="text-white text-left font-sans mt-2 whitespace-pre-wrap">{item.poem}</pre>
    </div>
  );
}


export const ContactCard = ({ item }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-[#b52323] border border-red-300 hover:scale-105 transition-transform duration-300 ease-in-out w-72">
      <h2 className="text-lg font-semibold text-red-100 mb-1">{item.name}</h2>
      <InfoField label="Email" value={item.email} />
      <p className="text-red-50 mt-2">{item.message}</p>
    </div>
  );
}

export const DataGrid = ({ data, renderItem, emptyMessage }) => {
  return (
    data?.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-4 m-6">
        {data.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
        ))}
      </div>
    ) : (
      <p className="text-center text-red-200">{emptyMessage}</p>
    )
  );
}