import React, { useEffect, useState } from "react";
import { contactFormData, photographyFormData, poemFormData, artFormData } from "../../../api/adminapis";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import { SectionTitle, DataGrid, ContactCard, PoemCard, ImageCard } from "../../components/userDataReusable/UserDataReusable";

const UsersData = () => {
  const [contactData, setContactData] = useState([]);
  const [photographyData, setPhotographyData] = useState([]);
  const [poemData, setPoemData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all submitted forms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, photoRes, poemRes, artRes] = await Promise.all([
          contactFormData(),
          photographyFormData(),
          poemFormData(),
          artFormData(),
        ]);

        setContactData(contactRes.data.data || []);
        setPhotographyData(photoRes.data.data || []);
        setPoemData(poemRes.data.data || []);
        setArtData(artRes.data.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen text-center pb-12">
      {/* Photography Section */}
      <SectionTitle title="📸 Photographs Sent by Students" />
      <DataGrid
        data={photographyData}
        renderItem={(item) => <ImageCard item={item} />}
        emptyMessage="No photographs found."
      />

      {/* Artwork Section */}
      <SectionTitle title="🎨 Artworks Sent by Students" />
      <DataGrid
        data={artData}
        renderItem={(item) => <ImageCard item={item} />}
        emptyMessage="No artworks found."
      />

      {/* Poem Section */}
      <SectionTitle title="✍️ Poems Sent by Students" />
      <DataGrid
        data={poemData}
        renderItem={(item) => <PoemCard item={item} />}
        emptyMessage="No poems found."
      />

      {/* Contact Section */}
      <SectionTitle title="💌 Contact Us Form Submissions" />
      <DataGrid
        data={contactData}
        renderItem={(item) => <ContactCard item={item} />}
        emptyMessage="No contact messages found."
      />
    </div>
  );
};

export default UsersData;