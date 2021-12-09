<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ReceiptController extends Controller
{
    public function GetReceipts(Request $request)
    {
        $res = User::where("token", "=", $request->header('Authorization'))
            ->first()
            ->receipts;
        if ($res) {
            return response()->json($res, 200)
                ->header('Content-Type', 'application/json');
        }
        return response("Error", 500);
    }

    public function AddReceipt(Request $request)
    {
        $category = $request->category;
        $sum = $request->sum;
        $date = $request->date;
        $image = $request->image;

        $imageName = $this->uploadImage64($image, Str::random(26));
        $imagePath = env('APP_IMAGE_URL') . $imageName;

        $receiptModel = new Receipt;
        $receiptModel->user_id = User::where("token", "=", $request->header('Authorization'))->first()->id;
        $receiptModel->category = $category;
        $receiptModel->sum = $sum;
        $receiptModel->date = $date;
        $receiptModel->image = $imagePath;
        
        $res = $receiptModel->save();

        if ($res) {
            $newReceiptsArray = User::where("token", "=", $request->header('Authorization'))
            ->first()
            ->receipts;
            if ($newReceiptsArray) {
                return response()->json($newReceiptsArray, 200)
                    ->header('Content-Type', 'application/json');
            }
        } else {
            return response("Error", 500);
        }
    }

    public function DeleteReceipt(Request $request, $id)
    {
        $receipt = User::where("token", "=", $request->header('Authorization'))
                ->first()
                ->receipts
                ->where("id", $id)
                ->first();
        $image = explode("storage/", $receipt->image)[1];

        if ($receipt) {
            $res = $receipt->delete();
            if ($res) {
                Storage::delete("public/" . $image);
                return response("Successfully deleted", 200);
            }
        } 

        return response("Error", 500);
    }

    public function GetReceipt(Request $request, $id)
    {
        $receipt = User::where("token", "=", $request->header('Authorization'))
            ->first()
            ->receipts
            ->where("id", "=", $id)
            ->first();
        if ($receipt) {
            return response()->json($receipt, 200)
                ->header('Content-Type', 'application/json');
        }
        return response("Error", 500);
    }

    public function UpdateReceipt(Request $request)
    {
        $category = $request->category;
        $sum = $request->sum;
        $date = $request->date;
        $image = $request->image;

        $receipt = User::where("token", "=", $request->header('Authorization'))
            ->first()
            ->receipts
            ->where("id", "=", $request->id)
            ->first();
        $receipt->category = $category;
        $receipt->sum = $sum;
        $receipt->date = $date;

        if (boolval($image)) {
            $imageName = $this->uploadImage64($image, Str::random(26));
            $imagePath = env('APP_IMAGE_URL') . $imageName;

            $oldImage = explode("storage/", $receipt->image)[1];
            Storage::delete("public/" . $oldImage);

            $receipt->image = $imagePath;
        }

        $res = $receipt->save();

        if ($res) {
            return response()->json($receipt->image, 200)
                ->header('Content-Type', 'application/json');
        }
        return response("Error", 500); 
    }

// image functions
    private function uploadImage64($image_64, $name)
    {
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',')+1); 

        $image = str_replace($replace, '', $image_64); 

        $image = str_replace(' ', '+', $image); 

        $imageName = $name . '.' . $extension;

        Storage::disk('public')->put("images/" . $imageName, base64_decode($image));

        return $imageName;
    }
}