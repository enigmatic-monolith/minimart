import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type User = {
  id: string;
  email: string;
  phone: string;
  is_banned: boolean;
}

export const UserManagementPage = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[]>([]);

  const banUser = (user: User) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/ban`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((res) => {
        if (res.status === 201) {
          setUsers(users.map((u) => {
            if (u.id === user.id) {
              return { ...u, is_banned: true };
            }
            return u;
          }));
        }
      })
  };

  const unbanUser = (user: User) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/ban`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((res) => {
        if (res.status === 200) {
          setUsers(users.map((u) => {
            if (u.id === user.id) {
              return { ...u, is_banned: false };
            }
            return u;
          }));
        }
      })
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data: User[]) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell style={{ width: "150px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {user.is_banned ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => unbanUser(user)}
                    >
                      Unban
                    </Button>
                    ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => banUser(user)}
                    >
                      Ban
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
