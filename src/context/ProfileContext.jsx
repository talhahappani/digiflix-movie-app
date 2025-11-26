import { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("digiflix_profiles");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentProfile, setCurrentProfile] = useState(() => {
    const active = sessionStorage.getItem("digiflix_active_profile");
    return active ? JSON.parse(active) : null;
  });

  useEffect(() => {
    localStorage.setItem("digiflix_profiles", JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = (name, avatarId) => {
    const newProfile = {
      id: Date.now(),
      name,
      avatar: `/avatars/${avatarId}.jpg`,
    };
    setProfiles([...profiles, newProfile]);
  };

  const selectProfile = (profile) => {
    setCurrentProfile(profile);
    sessionStorage.setItem("digiflix_active_profile", JSON.stringify(profile));
  };

  const editProfile = (id, newName, newAvatarId) => {
    const updatedProfiles = profiles.map((profile) => (profile.id === id ? { ...profile, name: newName, avatar: `/avatars/${newAvatarId}.jpg` } : profile));
    setProfiles(updatedProfiles);
  };

  const deleteProfile = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    if (currentProfile && currentProfile.id === id) {
      logoutProfile();
    }
  };

  const logoutProfile = () => {
    setCurrentProfile(null);
    sessionStorage.removeItem("digiflix_active_profile");
  };

  return <ProfileContext.Provider value={{ profiles, currentProfile, addProfile, selectProfile, logoutProfile, editProfile, deleteProfile }}>{children}</ProfileContext.Provider>;
};
