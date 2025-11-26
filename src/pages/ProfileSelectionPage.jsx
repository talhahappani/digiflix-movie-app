import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { IoAddCircle, IoPencil } from "react-icons/io5";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const AVATARS = [1, 2, 3, 4, 5];

const ProfileSelectionPage = () => {
  useDocumentTitle();
  const { profiles, addProfile, selectProfile, editProfile, deleteProfile } = useProfile();

  const [mode, setMode] = useState("select");
  const [editingId, setEditingId] = useState(null);

  const [nameInput, setNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState(1);

  const openForm = (type, profile = null) => {
    setMode(type);
    if (type === "edit" && profile) {
      setEditingId(profile.id);
      setNameInput(profile.name);
      const avatarId = parseInt(profile.avatar.split("/").pop().split(".")[0]);
      setAvatarInput(avatarId || 1);
    } else {
      setEditingId(null);
      setNameInput("");
      setAvatarInput(1);
    }
  };

  const handleSave = () => {
    if (!nameInput.trim()) return;

    if (mode === "add") {
      addProfile(nameInput, avatarInput);
    } else if (mode === "edit" && editingId) {
      editProfile(editingId, nameInput, avatarInput);
    }
    setMode("manage");
  };

  const handleDelete = () => {
    if (editingId) {
      deleteProfile(editingId);
      setMode("manage");
    }
  };

  if (mode === "add" || mode === "edit") {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white animate-fade-in">
        <h1 className="text-2xl md:text-[32px] mb-2 font-bold">{mode === "add" ? "Add Profile" : "Edit Profile"}</h1>
        <h2 className="text-white text-sm md:text-lg mb-8 text-center">{mode === "add" ? "Add a profile for another person." : "Choose an avatar and a name."}</h2>

        <div className="flex flex-col gap-6 w-full max-w-[500px] px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 border-b border-[#333] pb-6">
            <img src={`/avatars/${avatarInput}.jpg`} alt="Avatar" className="w-16 h-16 md:w-24 md:h-24 rounded-md shadow-lg" />
            <div className="w-full">
              <input type="text" placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="bg-transparent border-[#333] border placeholder-gray-300 px-4 py-2 w-full outline-none text-white rounded-sm text-base md:text-lg" autoFocus />
            </div>
          </div>

          <div>
            <p className="mb-3 text-base md:text-lg text-[#ccc]">Choose Icon:</p>
            <div className="flex gap-4 justify-center flex-wrap">
              {AVATARS.map((id) => (
                <img key={id} src={`/avatars/${id}.jpg`} onClick={() => setAvatarInput(id)} className={`w-12 h-12 md:w-16 md:h-16 cursor-pointer rounded-md border-4 transition-transform hover:scale-105 ${avatarInput === id ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`} alt={`Avatar ${id}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8 flex-wrap">
            <button onClick={handleSave} className="bg-white text-black px-6 py-2 font-bold text-base md:text-lg hover:bg-white/70 transition-colors">
              Save
            </button>
            <button onClick={() => setMode(mode === "add" ? "select" : "manage")} className="border border-[#666] text-[#666] px-6 py-2 font-bold text-base md:text-lg hover:border-white hover:text-white transition-colors">
              Cancel
            </button>

            {mode === "edit" && (
              <button onClick={handleDelete} className="bg-[#c00] text-white px-6 py-2 hover:bg-[rgba(204,0,0,0.75)] font-bold text-base md:text-lg transition-colors">
                Delete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-4">
      <h1 className="my-6 md:my-12 text-3xl md:text-[3.5vw] w-full text-white transition-all text-center">{mode === "manage" ? "Manage Profiles:" : "Who's watching?"}</h1>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 my-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="group w-24 md:w-[10vw] max-w-[200px] min-w-[84px] flex flex-col items-center gap-2 md:gap-4 cursor-pointer relative"
            onClick={() => {
              if (mode === "manage") {
                openForm("edit", profile);
              } else {
                selectProfile(profile);
              }
            }}
          >
            <div className="relative w-full aspect-square">
              <div className={`w-full h-full rounded-md overflow-hidden border-2 transition-all duration-300 ${mode === "manage" ? "border-transparent opacity-50" : "border-transparent group-hover:border-white"}`}>
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>

              {mode === "manage" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-black/50 border-2 border-white rounded-full p-2 hover:bg-black/80 transition-colors">
                    <IoPencil className="text-white w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              )}
            </div>

            <span className={`text-sm md:text-[1.3vw] 2xl:text-2xl transition-colors duration-300 ${mode === "manage" ? "text-[#808080]" : "text-[#808080] group-hover:text-[#e5e5e5]"}`}>{profile.name}</span>
          </div>
        ))}

        {mode === "select" && profiles.length < 5 && (
          <div className="group w-24 md:w-[10vw] max-w-[200px] min-w-[84px] flex flex-col items-center gap-2 md:gap-4 cursor-pointer" onClick={() => openForm("add")}>
            <div className="border-none w-full aspect-square rounded-md flex items-center justify-center bg-transparent group-hover:bg-white transition-all duration-300 border-2 group-hover:border-white text-[#808080]">
              <IoAddCircle className="w-full h-full group-hover:text-[#141414]" />
            </div>
            <span className="text-[#808080] group-hover:text-[#e5e5e5] text-sm md:text-[1.3vw] 2xl:text-2xl transition-colors duration-300 border-none text-center">Add Profile</span>
          </div>
        )}
      </div>

      <button onClick={() => setMode(mode === "manage" ? "select" : "manage")} className={`mt-8 md:mt-12 mb-6 border border-[#808080] text-[#808080] px-6 py-2 md:px-8 md:py-3 hover:border-white hover:text-white transition-all duration-300 tracking-widest text-lg md:text-2xl font-medium ${mode === "manage" ? "bg-white text-black hover:bg-[#c00] hover:text-white hover:border-transparent border-transparent font-bold" : ""}`}>
        {mode === "manage" ? "Done" : "Manage Profiles"}
      </button>
    </div>
  );
};

export default ProfileSelectionPage;
