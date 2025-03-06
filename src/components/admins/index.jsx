import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { LiaUser } from "react-icons/lia";
import { db } from "../../assets/firebaseConfig";
import { useUserAuth } from "../../assets/context/userAuthContext";

const Admins = () => {
  const [users, setUsers] = useState([]);
  const { setClickedUser } = useUserAuth();

  useEffect(() => {
    const userListRef = collection(db, "patientsData");

    const unsubscribe = onSnapshot(
      userListRef,
      (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Snapshot Data:", usersList);
        setUsers(usersList);
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );

    return () => {
      console.log("Unsubscribing from user updates");
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <ul>
        {users.length === 0 ? (
          <li>No users found</li>
        ) : (
          users.map((user) => (
            <li
              className="flex justify-between items-center p-3 mt-2"
              key={user.id}
            >
              <div className="flex justify-center">
                <LiaUser className="bg-gray-200 rounded-full text-4xl" />
                <div
                  onClick={() => {
                    setClickedUser({
                      userId: user.id,
                      name: user.fullName || "User",
                      email: user.email || "No email provided",
                    });
                    console.log("Clicked User:", user); // Log the clicked user
                  }}
                >
                  {user.fullName ? user.fullName : "User"}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Admins;
