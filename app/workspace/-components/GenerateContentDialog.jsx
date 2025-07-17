"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader, Sparkle } from "lucide-react";
import axios from "axios";

import { useRouter } from "next/navigation";


function GenerateContentDialog({ children }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    description:'',
    chapters:'',
    video:false,
    level:'',
    category:''
  })
  const router = useRouter()
 
  const onHandleIputChange =(field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }))
  }

     const generateContent=async ()=>{ 
      const courseId = uuidv4();
      setLoading(true)
        const result = await axios.post('/api/generate-course-layout',{
          ...formData,
          courseId,
          
        })
        console.log(result.data);
        if(result.data.resp=='limit exceed'){
          toast.warning('Please subscribe to plan!')
          router.push('/workspace/billing')
          return
        }
        setLoading(false)
        router.push('/workspace/edit-course/'+courseId)
     }


  const onGenerate =()=>{
    generateContent()
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Course Name</label>
                <Input onChange={(event)=>onHandleIputChange('name',event.target.value)} placeholder="Course Name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Course Description (optional)</label>
                <Textarea onChange={(event)=>onHandleIputChange('description',event.target.value)} placeholder="Course Description" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">No Of Chapters</label>
                <Input onChange={(event)=>onHandleIputChange('chapters',event.target.value)} placeholder="No Of Chapters" type="number" />
              </div>
              <div className="flex gap-2">
                <label htmlFor="">Include Video</label>
                <Switch
                onCheckedChange={() => onHandleIputChange('video', !formData.video)}
 />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Difficulty level</label>
                <Select onValueChange={(value)=>onHandleIputChange('level',value)} className={'w-full'}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Category</label>
                <Input onChange={(event)=>onHandleIputChange('category',event.target.value)} placeholder="Category (separated by comma)"/>
              </div>
              <Button onClick={onGenerate} className="flex cursor-pointer mt-2">
                {
                  loading?
                  <Loader className="animate-spin"/>:<Sparkle/>
                }
                 Generate Course</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateContentDialog;
