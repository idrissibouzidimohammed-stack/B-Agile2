<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\ActualiteController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Pages publiques B-AGILE
Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/a-propos', fn () => Inertia::render('About'))->name('about');
Route::get('/nos-solutions', [SolutionController::class, 'index'])->name('solutions.index');
Route::get('/nos-solutions/{slug}', [SolutionController::class, 'show'])->name('solutions.show');
Route::get('/partenariat', fn () => Inertia::render('Partenariat'))->name('partenariat');
Route::get('/actualites', [ActualiteController::class, 'index'])->name('actualites.index');
Route::get('/carriere', fn () => Inertia::render('Carriere'))->name('carriere');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('auth.google.callback');

// Pages privées (Dashboard, Demandes, Profile)
Route::get('/dashboard', [DemandeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/demandes', [DemandeController::class, 'store'])->name('demandes.store');
    Route::patch('/demandes/{demande}/status', [DemandeController::class, 'updateStatus'])->name('demandes.update-status');
    Route::post('/demandes/{demande}/responses', [DemandeController::class, 'storeResponse'])->name('demandes.store-response');
});

Route::post('/switch-space', [DemandeController::class, 'switchSpace'])->name('switch-space');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-email', function () {
    try {
        Mail::raw('Ceci est un test email B-AGILE', function($msg) {
            $msg->to('idrissibouzidimohammed@gmail.com')->subject('Test direct B-AGILE');
        });
        return 'Email envoyé avec succès - vérifie ta boîte Gmail et les Spams';
    } catch (\Exception $e) {
        return 'ERREUR : ' . $e->getMessage();
    }
});

require __DIR__.'/auth.php';