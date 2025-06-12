
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoModalProps {
  videoUrl: string;
  modalType: "trailer" | "full";
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, modalType, onClose }) => {
  return (
    <Dialog open={!!videoUrl} onOpenChange={onClose}>
      <DialogContent 
        className={`p-0 border-0 bg-transparent ${
          modalType === "full" 
            ? "max-w-[90vw] w-[90vw] h-[90vh]" 
            : "max-w-lg w-full aspect-video"
        }`}
      >
        <div className="relative w-full h-full">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute -top-10 right-0 z-50 text-white hover:text-gray-300 hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <iframe
            src={videoUrl}
            title="Video Preview"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;