"use client";
import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useActiveRequest, usePrices } from "@/customHooks/CustomHooks";
import { useRouter } from "next/navigation";
import { vnd } from "@/libs/currency";
import Image from "next/image";

const Pricing = ({
  selectedIndex,
  setSelectedIndex,
  userId,
}: {
  selectedIndex: number;
  setSelectedIndex: any;
  userId: string;
}) => {
  const { prices, isLoadingPrices } = usePrices(true);

  const [isSelect, setIsSelect] = useState(false);
  const [selectedIndex2, setSelectedIndex2] = useState("");
  const router = useRouter();
  const { request, mutateRequest } = useActiveRequest(userId);

  const [isPending, setIsPending] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));

  const plans = [
    {
      key: 1,
      name: "Basic Plan (Free)",
      price: 0,
      duration: 0,
      features: [
        {
          feature: "Learn vocabularies with typing and speaking",
          status: true,
        },
        {
          feature: "Number of times you have learned that vocabulary",
          status: false,
        },
        {
          feature: "Report of learned vocabularies",
          status: false,
        },
        {
          feature: "Practice vocabulaires",
          status: false,
        },
        {
          feature: "Test vocabularies and get scores",
          status: false,
        },
      ],
    },
    {
      key: 2,
      name: "Pro Plan",
      price: !isLoadingPrices && prices[0]?.price,
      duration: 1,
      features: [
        {
          feature: "Learn vocabularies with typing and speaking",
          status: true,
        },
        {
          feature: "Number of times you have learned that vocabulary",
          status: true,
        },
        {
          feature: "Report of learned vocabularies",
          status: true,
        },
        {
          feature: "Practice vocabulaires",
          status: true,
        },
        {
          feature: "Test vocabularies and get scores",
          status: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (request?.length) {
      setIsPending(true);
    }
  }, [request]);

  useEffect(() => {
    if (prices) {
      setSelectedIndex2(prices[0]._id);
    }
  }, [prices]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isXs ? "90%" : isMd ? "80%" : "70%",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: isSm ? 2 : 4,
    outline: "none",
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSm ? "90%" : isMd ? "50%" : "30%",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    outline: "none",
  };
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleListItemClick2 = (index: string) => {
    setSelectedIndex2(index);
  };
  return (
    <Box sx={!isSelect ? style : style2}>
      {isPending ? (
        <Alert severity="info">Waiting for admin confirmation</Alert>
      ) : (
        <List component="nav" aria-label="secondary mailbox folder">
          {!isSelect ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <div
                style={
                  isLg
                    ? {
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        marginBottom: "20px",
                        paddingBottom: "80px",
                      }
                    : {
                        display: "flex",
                        marginBottom: "80px",
                        justifyContent: "center",
                      }
                }
              >
                {plans.map((plan) => (
                  <ListItemButton
                    key={plan.key}
                    selected={selectedIndex === plan.key}
                    onClick={() => handleListItemClick(plan.key)}
                    sx={{ display: "relative" }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          style={{ color: "var(--titleText-color" }}
                        >
                          {plan.name}
                        </Typography>
                      }
                      secondary={
                        <div>
                          <Typography component="span" variant="h6">
                            From:{" "}
                            <Typography
                              fontWeight="bold"
                              component="span"
                              variant="h6"
                            >
                              {vnd(plan.price)}
                            </Typography>
                          </Typography>
                          <Typography gutterBottom>Features:</Typography>

                          {plan.features.map((feature) => (
                            <Typography
                              variant="subtitle2"
                              sx={{ display: "flex", gap: "10px" }}
                              gutterBottom
                              key=""
                              fontWeight={feature.status ? "bold" : "light"}
                            >
                              {feature.status ? (
                                <CheckOutlinedIcon fontSize="small" />
                              ) : (
                                <CloseOutlinedIcon fontSize="small" />
                              )}
                              {feature.feature}
                            </Typography>
                          ))}
                        </div>
                      }
                    />
                    {plan.key === 2 && (
                      <Image
                        src="/images/crown.png"
                        alt=""
                        width={30}
                        height={30}
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                        }}
                      />
                    )}
                  </ListItemButton>
                ))}
              </div>
              <div
                style={{
                  width: "100%",
                  position: "fixed",
                  bottom: 0,
                  padding: "20px 0",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  borderTop: "1px solid #d4d1d1",
                }}
              >
                <Button
                  sx={{ width: "200px" }}
                  variant="contained"
                  disabled={selectedIndex === 1 ? true : false}
                  onClick={() => setIsSelect(true)}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {prices.map((price: any) => (
                  <>
                    <ListItemButton
                      key=""
                      selected={selectedIndex2 === price?._id}
                      onClick={() => handleListItemClick2(price?._id)}
                      sx={{
                        borderRadius: "10px",
                        border:
                          selectedIndex2 === price?._id
                            ? "2px solid rgba(20, 121, 244, 1)"
                            : "2px solid rgba(20, 121, 244, 0.3)",
                        padding: "20px",
                        color:
                          selectedIndex2 === price?._id
                            ? "rgba(20, 121, 244, 1)"
                            : "rgba(20, 121, 244, 0.3)",
                      }}
                    >
                      <ListItemText
                        primary={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Typography variant="h5" fontWeight="bold">
                              {price?.duration + " months"}
                            </Typography>
                            <Typography>{vnd(price?.price)}</Typography>
                          </div>
                        }
                      />
                    </ListItemButton>

                    <Divider />
                  </>
                ))}
              </List>
              <Button
                variant="contained"
                onClick={() => router.push(`/checkout/${selectedIndex2}`)}
              >
                Continue
              </Button>
            </div>
          )}
        </List>
      )}
    </Box>
  );
};

export default Pricing;
