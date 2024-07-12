import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { connectNFIDWallet } from "../nfidWallet";
import { Principal } from "@dfinity/principal";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// Define a custom font style
const headerFont = {
  fontFamily: "Bungee Inline, cursive",
};

interface WalletPopupProps {
  onClose: () => void;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [walletType, setWalletType] = useState<"plug" | "nfid" | null>(null);

  const connectPlugWallet = async () => {
    setIsConnecting(true);
    setConnectionStatus(null);
    setWalletType("plug");

    const host = "http://127.0.0.1:4943/";

    const onConnectionUpdate = () => {
      console.log(
        "Session data is: ",
        (window as any).ic?.plug?.sessionManager?.sessionData
      );

      localStorage.setItem(
        "principal",
        (window as any).ic?.plug?.sessionManager?.sessionData.principalId
      );
      // Save the principal and account ID in the state
    };

    try {
      const publicKey: Uint8Array = await (
        window as any
      ).ic.plug.requestConnect({
        host,
        onConnectionUpdate,
        timeout: 5000,
      });

      console.log(`The connected user's public key is:`, publicKey);

      setConnectionStatus("success");
      // Save the principal and account ID in the state
      localStorage.setItem(
        "principal",
        (window as any).ic?.plug?.sessionManager?.sessionData.principalId
      );
      setTimeout(() => {
        setConnectionStatus(null);
      }, 3000);
    } catch (e) {
      console.log(e);
      setConnectionStatus("error");

      setTimeout(() => {
        setConnectionStatus(null);
      }, 3000);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectNFIDWalletHandler = async () => {
    setIsConnecting(true);
    setConnectionStatus(null);
    setWalletType("nfid");

    try {
      const principal = await connectNFIDWallet();

      if (principal) {
        localStorage.setItem("principal", principal);

        console.log(`The connected user's principal is:`, principal);

        setConnectionStatus("success");

        setTimeout(() => {
          setConnectionStatus(null);
        }, 3000);
      } else {
        setConnectionStatus("error");

        setTimeout(() => {
          setConnectionStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error connecting to NFID wallet:", error);
      setConnectionStatus("error");

      setTimeout(() => {
        setConnectionStatus(null);
      }, 3000);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          backgroundColor: "#222831",
          color: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{ backgroundColor: "#393e46", textAlign: "center", ...headerFont }}
      >
        <Typography variant="h5" sx={{ color: "#ffffff" }}>
          Choose a Wallet
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Container sx={{ py: 2 }}>
          <Button
            variant="contained"
            disabled={isConnecting}
            onClick={connectPlugWallet}
            sx={{
              mb: 2,
              width: "100%",
              bgcolor:
                isConnecting && walletType === "plug" ? "#76ABAE" : "#30475e",
              color:
                isConnecting && walletType === "plug" ? "#30475e" : "#ffffff",
              "&:hover": {
                bgcolor: "#76ABAE",
              },
            }}
          >
            {isConnecting && walletType === "plug" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Connect Plug Wallet"
            )}
          </Button>
          <Button
            variant="contained"
            disabled={isConnecting}
            onClick={connectNFIDWalletHandler}
            sx={{
              width: "100%",
              bgcolor:
                isConnecting && walletType === "nfid" ? "#76ABAE" : "#30475e",
              color:
                isConnecting && walletType === "nfid" ? "#30475e" : "#ffffff",
              "&:hover": {
                bgcolor: "#76ABAE",
              },
            }}
          >
            {isConnecting && walletType === "nfid" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Connect NFID Wallet"
            )}
          </Button>
          {isConnecting && (
            <div style={{ marginTop: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#cccccc" }}>
                Accept the request connection
              </Typography>
              <ThreeDots color="#4fa94d" height={40} width={40} />
            </div>
          )}
          {connectionStatus === "success" && (
            <Typography variant="body1" sx={{ mt: 2, color: "#4caf50" }}>
              Connection successful!
            </Typography>
          )}
          {connectionStatus === "error" && (
            <Typography variant="body1" sx={{ mt: 2, color: "#f44336" }}>
              Connection failed. Do you have plug extension installed?
            </Typography>
          )}
        </Container>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#393e46", padding: "12px" }}>
        <Button
          onClick={onClose}
          sx={{ width: "100%", bgcolor: "#c7c7c7", color: "#000000" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletPopup;
