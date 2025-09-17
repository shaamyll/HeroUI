"use client";
import type { SpringOptions } from "motion/react";
import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function CardView() {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useSpring(1, springValues);

  function handleMouseEnter() {
    scale.set(1.08); // scaleOnHover
  }

  function handleMouseLeave() {
    scale.set(1);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        ref={ref}
        style={{ scale, willChange: "transform" }}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="max-w-[400px] shadow-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="heroui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">HeroUI</p>
              <p className="text-small text-default-500">heroui.com</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/heroui-inc/heroui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
