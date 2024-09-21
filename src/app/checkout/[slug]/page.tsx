"use client";
import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";

import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Image from "next/image";
import {
  useActiveRequest,
  usePriceById,
  useSession,
} from "@/customHooks/CustomHooks";
import { createActiveRequest } from "@/libs/actions";
import { vnd } from "@/libs/currency";
import { phone } from "phone";

const features = [
  {
    feature: "Learn vocabularies with typing and speaking",
    status: false,
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
];

const CheckoutPage = ({ params }: any) => {
  const { slug } = params;
  const { price } = usePriceById(slug);
  const { sessionData } = useSession();
  const { request, mutateRequest } = useActiveRequest(sessionData?.user?.id);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [phoneNum, setPhoneNum] = useState("");
  const [result, setResult] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (request?.length) {
      setIsPending(true);
    }
  }, [request]);

  const handlePhone = (input: string) => {
    setPhoneNum(input);
    const { phoneNumber, isValid } = phone(input, { country: "VNM" });
    if (isValid) {
      setIsValid(true);
      setResult(phoneNumber);
    } else {
      setIsValid(false);
      setResult("");
    }
  };

  return (
    <div className={styles.container}>
      <Grid
        container
        direction={isMobile ? "column-reverse" : "row"} // Reverse on mobile
      >
        <Grid xs={12} md={6}>
          <div className={styles.wrapper}>
            <Typography
              variant="h5"
              textAlign="center"
              textTransform="uppercase"
              fontWeight="bold"
              color="var(--titleText-color)"
            >
              Purchase confirmation
            </Typography>
            <div className={styles.top}>
              <div className={styles.left}>
                <Typography variant="h6">Selected plan</Typography>
              </div>
              <div className={styles.right}>
                <Typography variant="h5">{price?.duration} months</Typography>
                <Typography variant="subtitle1">Pro plan</Typography>
              </div>
            </div>
            <Divider />
            <div className={styles.bottom}>
              <div className={styles.left}>
                <Typography variant="h6">Amount</Typography>
              </div>
              <div className={styles.right}>
                <Typography variant="h5">{vnd(price?.price)}</Typography>
              </div>
            </div>
            <Divider />
            <div>
              <Typography variant="h6">New features you will get</Typography>
              <div className={styles.features}>
                {features.map((feature) => (
                  <div key="" className={styles.feature}>
                    <DoneOutlineIcon fontSize="small" />
                    <Typography
                      fontWeight={feature.status === true ? "bold" : "light"}
                    >
                      {feature.feature}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              {isPending ? (
                <Button variant="contained" fullWidth disabled={true}>
                  Đang chờ admin xử lý
                </Button>
              ) : (
                <>
                  <OutlinedInput
                    error={isValid ? false : true}
                    type="number"
                    placeholder="SĐT của bạn"
                    value={phoneNum}
                    onChange={(e) => {
                      handlePhone(e.target.value);
                    }}
                    startAdornment={
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "10px" }}
                      >
                        +84
                      </InputAdornment>
                    }
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={async () => {
                      setIsLoading(true);
                      await createActiveRequest({
                        userId: sessionData?.user?.id,
                        priceId: slug,
                        phone: result,
                      });
                      mutateRequest();
                      setIsLoading(false);
                    }}
                    disabled={result === "" || isLoading ? true : false}
                  >
                    Xác nhận thanh toán
                  </Button>
                </>
              )}

              <Typography variant="caption" fontWeight="bold" color="red">
                * Sau khi chuyển khoản thành công vui lòng xác nhận thanh toán
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={6}>
          <div className={styles.infoWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/qrcode.jpg"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
            <Typography component="span" variant="subtitle1">
              * Nội dung chuyển khooản vui lòng nhập{" "}
              <Typography
                fontWeight="bold"
                component="span"
                variant="subtitle1"
              >
                email đăng nhập
              </Typography>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
