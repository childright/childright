import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Router = createTRPCRouter({
  getStandardUploadPresignedUrl: protectedProcedure.mutation(
    async ({ ctx }) => {
      const putObjectCommand = new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: ctx.session.user.id, // use userId to only store 1 file per user
        ContentType: "application/pdf",
      });

      return await getSignedUrl(ctx.s3, putObjectCommand);
    }
  ),

  hasFile: protectedProcedure.query(async ({ ctx }) => {
    try {
      await ctx.s3.headObject({
        Bucket: env.AWS_S3_BUCKET,
        Key: ctx.session.user.id,
      });

      return true;
    } catch (error) {
      return false;
    }
  }),
});
