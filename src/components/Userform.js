"use client";
import AddressInputs from "@/components/AddressInputs";
import { useProfile } from "@/components/Useprofile";
import { useEffect, useState } from "react";

export default function UserForm({ user, onSave }) {
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  useEffect(() => {
    if (user) {
      setPhone(user.phone || "");
      setStreetAddress(user.streetAddress || "");
      setPostalCode(user.postalCode || "");
      setCity(user.city || "");
      setCountry(user.country || "");
      setAdmin(user.admin || false);
    }
  }, [user]);

  return (
    <div className="md:flex gap-4">
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        <div className="flex justify-center item-center mt-5">
          <button
            type="submit"
            className="bg-[#973131] text-white px-5 py-2 rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
