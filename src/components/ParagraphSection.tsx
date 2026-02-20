"use client";

import { motion } from "motion/react";

export default function ParagraphSection() {
  return (
    <section className="my-60">
      <motion.p
        initial={{ opacity: 0, filter: "blur(5px)", y: 100 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="text-[clamp(1.3rem,2vw,4rem)] font-archivo text-center w-2/3 mx-auto"
      >
        Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
      </motion.p>
    </section>
  );
}