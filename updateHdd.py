############################################# MODELS #############################################
from django.db import models

    class Book(models.Model):

        book_id=models.AutoField(primary_key=True,unique=True)
        book_name=models.CharField(max_length=30)
        author_name=models.CharField(max_length=30)
        publisher_name=models.CharField(max_length=40)

        class Meta:
            db_table = u'Book'

        def __unicode__(self):
            return "%d %s %s %s" % (self.book_id,self.book_name, self.author_name,self.publisher_name)

############################################# FORMS #############################################
from django import forms
from django.forms import ModelForm
from myapp.models import Book


class BookForm(ModelForm):

    class Meta:
        model = Book

        fields=['book_id','book_name','author_name','publisher_name']

############################################# VIEWS #############################################
def editbook(request,book_id):

    queryset = Book.objects.filter(book_id=book_id)
     if request.POST:
            book_form = BookForm(request.POST)

        if book_form.is_valid():

            book = Book.objects.get(pk=book_id)
            book_form = BookForm(request.POST, instance = book)
            book_form.save() #cleaned indenting, but would not save unless I added at least 6 characters.
            return redirect('/index/')
        else:
            book = Book.objects.get(pk = book_id)       
            book_form = BookForm(instance=book)

            return render_to_response('editbook.html',{ 'form':book_form }, context_instance=RequestContext(request))
        
        
        
        
def updateHardDrive(request, hdd_id):
    
    queryset = HardDrive.objects.filter(hdd_id = hdd_id)
    if request.POST:
        form = addNewHardDrive(request.POST)
        
        if form.is_valid():
            hdd = HardDrive.objects.get(pd = hdd_id)
            form = addNewHardDrive(request.POST, instance = hdd)
            form.save()
            return redirect('/index/')
        else:
            hdd = HardDrive.objects.get(pk = hdd_id)
            form = addNewHardDrive(instance = hdd)
            
            # return render(request, 'a)
            
            
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        