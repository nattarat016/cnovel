// "use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Nav1, Nav2 } from "./Nav1";

export async function we() {
  let user = null;
  const supabase = await createClient();
  const cookie = await cookies().get("token");
  const { data, error } = await supabase
    .from("User")
    .select("name")
    .eq("sessions", cookie?.value);
  if (error) {
    return;
  }
  if (data[0] != undefined) user = data[0];

  return user;
}

export default async function ResponsiveAppBar() {
  let user = await we();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            C
          </Typography>
          <Nav1 />
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {user && <Nav2 />} {!user && <Link href={"/login"}>Login</Link>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
